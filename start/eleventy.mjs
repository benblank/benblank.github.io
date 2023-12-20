import { execInherit, execPipe, logify } from "./common.mjs";

const ELEVENTY_COMMAND = "eleventy --config=eleventy.config.js";
const ELEVENTY_INCREMENTAL = ELEVENTY_COMMAND + " --incremental";

const extraOptions = { cwd: "build" };

export const build = () => execInherit(ELEVENTY_COMMAND, extraOptions);
export const serve = () => logify(execPipe(ELEVENTY_INCREMENTAL + " --serve", extraOptions), "eleventy  ", "[11ty] ");
export const watch = () => logify(execPipe(ELEVENTY_INCREMENTAL + " --watch", extraOptions), "eleventy  ", "[11ty] ");
