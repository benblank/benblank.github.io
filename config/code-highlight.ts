import type { UserConfig } from "@11ty/eleventy";
import markdownItHighlightJs from "markdown-it-highlightjs";

export function codeHighlightConfig(eleventyConfig: UserConfig) {
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItHighlightJs, { auto: false, code: false, ignoreIllegals: false });
  });
}
