import { rimraf } from "rimraf";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";

import * as content from "./content.js";
import * as eleventy from "./eleventy.js";
import * as typescript from "./typescript.js";

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
    // TODO: more info about the error

    process.exitCode = 1;
    console.log(" ERROR");
    console.log(error);
  }

  return false;
}

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
  .command("serve [--clean]", "build the site, then serve it while watching for changes", { clean })
  .command("watch [--clean]", "build the site, then watch for changes", { clean })
  .option("clean", clean)

  .parseSync();

const command = args._[0];

if (command === "clean") {
  await cleanBuildArtifacts();
} else {
  if (!args.clean || (await cleanBuildArtifacts())) {
    if (command === "build") {
      // The content and TypeScript builds can occur in parallel, but both must
      // be finished before Eleventy can build.
      await Promise.all([content.build(), typescript.build()]).then(() => eleventy.build());
    } else if (command === "watch" || command === "serve") {
      // The content and TypeScript builds can occur in parallel, as can all
      // three watches/serves, but the Eleventy watch/serve cannot start until
      // both builds have finished.

      await Promise.all([content.build(), typescript.build()]);

      content[command]();
      typescript[command]();
      eleventy[command]();
    } else {
      console.error(`Unrecognized command "${command}".`);

      process.exitCode = 1;
    }
  } else {
    console.error("Aborting build due to failure while cleaning.");

    process.exitCode = 1;
  }
}
