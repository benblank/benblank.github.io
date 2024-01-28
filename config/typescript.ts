import type { UserConfig } from "@11ty/eleventy";
import ts from "typescript";

export function typescriptConfig(eleventyConfig: UserConfig) {
  const host: any = ts.sys;

  const commandLine = ts.getParsedCommandLineOfConfigFile("tsconfig.json", undefined, host);

  if (!commandLine) {
    throw new Error('Could not parse "tsconfig.json".');
  }

  eleventyConfig.addTemplateFormats("ts");

  eleventyConfig.addExtension("ts", {
    outputFileExtension: "js",

    compile(content: string, fileName: string) {
      const result = ts.transpileModule(content, {
        compilerOptions: commandLine.options,
        fileName,
        reportDiagnostics: false,
      });

      return () => result.outputText;
    },

    getData() {
      return { layout: undefined };
    },

    getInstanceFromInputPath(inputPath: string) {
      return {};
    },
  });
}
