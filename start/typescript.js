import { execInherit, execPipe, logify } from "./common.js";

const PREFIX = /\d\d?:\d\d:\d\d [AP]M - /;

export const build = () => execInherit("tsc --incremental");
export const watch = () => logify(execPipe("tsc --watch --preserveWatchOutput --incremental"), "typescript", PREFIX);
export const serve = watch;
