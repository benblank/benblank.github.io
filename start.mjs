import { watch } from "chokidar";
import { $ } from "execa";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import copy from "recursive-copy";
import { rimraf } from "rimraf";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

const $pipe = $({ stdin: "ignore" });
const $inherit = $pipe({ stderr: "inherit", stdout: "inherit" });

async function cleanBuildArtifacts() {
  process.stdout.write('Removing build artifact directories "_site" and "build"...');

  try {
    if (await rimraf(["_site", "build"])) {
      console.log(" DONE");

      return true;
    }

    process.exitCode = 1;
    console.log(" FAILURE");
  } catch (error) {
    // TODO: more info about the failure

    process.exitCode = 1;
    console.log(" ERROR");
    console.log(error);
  }

  return false;
}

async function copyWithoutTsFiles(/** @type {string} */ from, /** @type {string} */ to) {
  await copy(from, to, { dot: true, filter: /(?<!\.ts)$/, overwrite: true, results: false });
}

async function onContentChanged(/** @type {string} */ path) {
  if (!path.startsWith("src/")) {
    throw new Error(`Got unexpected path "${path}" from filesystem watcher.`);
  }

  await mkdir(dirname(path), { recursive: true });
  await copyWithoutTsFiles(path, path.replace(/^src/, "build"));
}

async function onContentRemoved(/** @type {string} */ path) {
  if (!path.startsWith("src/")) {
    throw new Error(`Got unexpected path "${path}" from filesystem watcher.`);
  }

  await rimraf(path.replace(/^src/, "build"));
}

async function setUpContentWatching() {
  const contentWatcher = watch("src", { ignoreInitial: true, ignored: "**/*.ts" });

  contentWatcher.on("add", onContentChanged);
  contentWatcher.on("addDir", onContentChanged);
  contentWatcher.on("change", onContentChanged);
  contentWatcher.on("unlink", onContentRemoved);
  contentWatcher.on("unlinkDir", onContentRemoved);

  await copyWithoutTsFiles("src", "build");

  return contentWatcher;
}
async function setUpEleventyWatching(/** @type {boolean} */ serve) {
  const childProcess = $pipe({ cwd: "build" })`eleventy --${
    serve ? "serve" : "watch"
  } --incremental --config=eleventy.config.js`;

  childProcess.stdout?.on("data", (chunk) => process.stdout.write(chunk));
  childProcess.stderr?.on("data", (chunk) => process.stderr.write(chunk));

  return childProcess;
}

async function setUpTypeScriptWatching() {
  const childProcess = $pipe`tsc --watch --preserveWatchOutput --incremental`;

  childProcess.stdout?.on("data", (chunk) => process.stdout.write(chunk));
  childProcess.stderr?.on("data", (chunk) => process.stderr.write(chunk));

  return childProcess;
}

// Really, these are only functions rather than inline below to make it easier
// to abort on failure (i.e. `return`).
const commands = {
  async build() {
    if (args.clean) {
      if (!(await cleanBuildArtifacts())) {
        console.log("Aborting build due to failure while cleaning.");

        return;
      }
    }

    await copy("src", "build", { dot: true, filter: /(?<!\.ts)$/, overwrite: true, results: false });
    await $inherit`tsc --incremental`;
    await $inherit({ cwd: "build" })`eleventy`;
  },

  async clean() {
    await cleanBuildArtifacts();
  },

  async serve() {
    if (args.clean) {
      if (!(await cleanBuildArtifacts())) {
        console.log("Aborting build due to failure while cleaning.");

        return;
      }
    }

    await setUpContentWatching();
    await $inherit`tsc --incremental`;
    setUpTypeScriptWatching();
    setUpEleventyWatching(true);
  },

  async watch() {
    if (args.clean) {
      if (!(await cleanBuildArtifacts())) {
        console.log("Aborting build due to failure while cleaning.");

        return;
      }
    }

    await setUpContentWatching();
    await $inherit`tsc --incremental`;
    setUpTypeScriptWatching();
    setUpEleventyWatching(false);
  },
};

/** @type {import("yargs").Options} */
const clean = {
  default: false,
  description: "remove any existing build artifacts before building the site",
  nargs: 0,
  type: "boolean",
};

const args = yargs(hideBin(process.argv))
  .demandCommand()
  .strict()
  .version(false)

  .command("clean", "remove any existing build artifacts")
  .command("build [--clean]", "build the site", { clean })
  .command("serve [--clean]", "build, then serve the site while watching for changes", { clean })
  .command("watch [--clean]", "build the site, then watch for changes", { clean })
  .option("clean", clean)

  .parseSync();

await commands[args._[0]]();
