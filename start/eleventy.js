import { writeFile } from "node:fs/promises";

import { execInherit, execPipe, logify } from "./common.js";

const ELEVENTY_COMMAND = "eleventy --config=eleventy.config.js";
const ELEVENTY_INCREMENTAL = ELEVENTY_COMMAND + " --incremental";

const extraOptions = { cwd: "build" };

/** A temporary workaround for 11ty/eleventy#3145.
 *
 * Ensures that the build directory includes a false package.json identifying
 * the package as using ES modules.
 *
 * @template T
 * @param {() => T} func
 * @returns {() => Promise<T>}
 */
function ensurePackageJson(func) {
  return async () => {
    await writeFile("build/package.json", '{ "type": "module" }');

    return func();
  };
}

export const build = () => execInherit(ELEVENTY_COMMAND, extraOptions);
export const serve = ensurePackageJson(() => logify(execPipe(ELEVENTY_INCREMENTAL + " --serve", extraOptions), "eleventy  ", "[11ty] "));
export const watch = ensurePackageJson(() => logify(execPipe(ELEVENTY_INCREMENTAL + " --watch", extraOptions), "eleventy  ", "[11ty] "));
