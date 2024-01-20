import { readFile } from "node:fs/promises";
import { dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

/** @type {import("typescript").CompilerOptions} */
let compilerOptions;

/** @type {string} */
const here = dirname(fileURLToPath(import.meta.url)) + "/";

/** @type {import("node:module").InitializeHook} */
export async function initialize() {
  /** @type {any} */
  const host = ts.sys;

  const commandLine = ts.getParsedCommandLineOfConfigFile("tsconfig.json", undefined, host);

  if (!commandLine) {
    throw new Error('Could not parse "tsconfig.json".');
  }

  compilerOptions = commandLine.options;
}

/** @type {import("node:module").LoadHook} */
export async function load(url, context, nextLoad) {
  try {
    const fileName = fileURLToPath(url);

    if (fileName.startsWith(here) && [".ts", ".tsx"].includes(extname(fileName))) {
      const result = ts.transpileModule(await readFile(fileName, "utf-8"), {
        compilerOptions,
        fileName,
        reportDiagnostics: false,
      });

      return { format: "module", shortCircuit: true, source: result.outputText };
    }
  } catch (error) {
    // This is typesafe as-is; if `error` is primitive, the optional chaining
    // will just resolve to `undefined`.
    //
    // @ts-expect-error
    if (error?.code !== "ERR_INVALID_URL_SCHEME") {
      throw error;
    }
  }

  return nextLoad(url, context);
}
