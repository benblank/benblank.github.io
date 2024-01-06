import { execaCommand } from "execa";

import { Logifier } from "./logifier.js";

/** @type {import("execa").Options} */
const EXEC_COMMON_OPTIONS = { preferLocal: true, stdin: "ignore", stripFinalNewline: false };

/**
 * @param {string} command
 * @param {import("execa").Options} extraOptions
 */
export const execInherit = (command, extraOptions = {}) => {
  console.log(`Executing "${command}"...`);
  return execaCommand(command, { ...EXEC_COMMON_OPTIONS, stderr: "inherit", stdout: "inherit", ...extraOptions });
};

/**
 * @param {string} command
 * @param {import("execa").Options} extraOptions
 */
// "pipe" is also the default, but specified for clarity.
export const execPipe = (command, extraOptions = {}) => {
  console.log(`Executing "${command}"...`);
  return execaCommand(command, { ...EXEC_COMMON_OPTIONS, stderr: "pipe", stdout: "pipe", ...extraOptions });
};

/**
 * @param {import("execa").ExecaChildProcess} childProcess
 * @param {string} label
 * @param {RegExp | string | null} prefix
 */
export const logify = (childProcess, label, prefix) => {
  if (!childProcess.stderr || !childProcess.stdout) {
    throw new Error("You can only logify piped processes.");
  }

  new Logifier(childProcess.stdout, label, prefix, false);
  new Logifier(childProcess.stderr, label, prefix, true);

  return childProcess;
};
