import type { LocalConfig, UserConfig } from "@11ty/eleventy";
import markdownItAbbr from "markdown-it-abbr";
import markdownItFootnote from "markdown-it-footnote";

import { codeHighlightConfig } from "./config/code-highlight.js";
import { detailsConfig } from "./config/details.js";
import { headingAnchorsConfig } from "./config/heading-anchors.js";
import { prettierConfig } from "./config/prettier.js";

type DeepPartial<T> = T extends Record<any, any>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

module.exports = (eleventyConfig: UserConfig): DeepPartial<LocalConfig> => {
  eleventyConfig.setWatchThrottleWaitTime(500);

  // By default, Eleventy ignores everything in `.gitignore`, but that includes
  // the directory all the content is in.
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy({ static: "." }, { dot: true });
  eleventyConfig.amendLibrary("md", (md) => md.use(markdownItAbbr));
  eleventyConfig.amendLibrary("md", (md) => md.use(markdownItFootnote));

  codeHighlightConfig(eleventyConfig);
  detailsConfig(eleventyConfig);
  headingAnchorsConfig(eleventyConfig);
  prettierConfig(eleventyConfig);

  return {
    dir: {
      // The input and output directories are interpreted as being relative to
      // the current working directory.
      input: "content",
      output: "../_site",

      // But layouts is interpreted as being relative to the input directory. 🙁
      layouts: "../layouts",
    },

    templateFormats: ["11ty.js", "md"],
  };
};
