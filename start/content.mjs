import { watch as chokidarWatch } from "chokidar";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { Readable } from "node:stream";
import copyRaw from "recursive-copy";
import { rimraf } from "rimraf";
import { Logifier } from "./logifier.mjs";

// https://github.com/microsoft/TypeScript/issues/49298#issuecomment-1140425750
const copy = "default" in copyRaw ? copyRaw.default : copyRaw;

const SOURCE_PREFIX = "src/";
const TARGET_PREFIX = "build/";

/**
 * @param {string} from Source path; must exist.
 * @param {string} to Destination path; will be overwritten.
 */
const copyWithoutTsFiles = (from, to) =>
  copy(from, to, { dot: true, filter: /(?<!\.ts)$/, overwrite: true, results: false });

export const build = () => {
  console.log("Copying content.");

  return copyWithoutTsFiles("src", "build");
};

export const watch = () => {
  const contentWatcher = chokidarWatch("src", { ignoreInitial: true, ignored: "**/*.ts" });
  const out = new Readable({ read() {} });
  const err = new Readable({ read() {} });

  new Logifier(out, "content   ", null, false);
  new Logifier(err, "content   ", null, true);

  async function onContentChanged(/** @type {string} */ sourcePath) {
    if (sourcePath.startsWith(SOURCE_PREFIX)) {
      const basePath = sourcePath.slice(SOURCE_PREFIX.length);

      out.push(`New or changed path: ${basePath}\n`);

      await mkdir(dirname(sourcePath), { recursive: true });
      await copyWithoutTsFiles(sourcePath, TARGET_PREFIX + basePath);
    } else {
      err.push(`Got unexpected path "${sourcePath}" from filesystem watcher.\n`);
    }
  }

  async function onContentRemoved(/** @type {string} */ sourcePath) {
    if (sourcePath.startsWith(SOURCE_PREFIX)) {
      const basePath = sourcePath.slice(SOURCE_PREFIX.length);

      out.push(`Removed path: ${basePath}\n`);

      await rimraf(TARGET_PREFIX + basePath);
    } else {
      err.push(`Got unexpected path "${sourcePath}" from filesystem watcher.`);
    }
  }

  contentWatcher.on("add", onContentChanged);
  contentWatcher.on("addDir", onContentChanged);
  contentWatcher.on("change", onContentChanged);
  contentWatcher.on("unlink", onContentRemoved);
  contentWatcher.on("unlinkDir", onContentRemoved);

  return contentWatcher;
};

export const serve = watch;
