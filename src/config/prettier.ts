import type { UserConfig } from "@11ty/eleventy";
import prettier from "prettier";

export function prettierConfig(eleventyConfig: UserConfig) {
  eleventyConfig.addTransform("prettier", function prettify(content, outputPath) {
    if (outputPath.endsWith(".html")) {
      return prettier.format(content, { filepath: outputPath });
    }

    return content;
  });
}
