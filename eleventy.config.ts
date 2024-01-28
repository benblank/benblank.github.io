import type { LocalConfig, UserConfig } from "@11ty/eleventy";
import markdownItAbbr from "markdown-it-abbr";
import markdownItFootnote from "markdown-it-footnote";

import { codeHighlightConfig } from "./config/code-highlight.ts";
import { detailsConfig } from "./config/details.ts";
import { headingAnchorsConfig } from "./config/heading-anchors.ts";
import { prettierConfig } from "./config/prettier.ts";

type DeepPartial<T> = T extends Record<any, any>
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export default (eleventyConfig: UserConfig): DeepPartial<LocalConfig> => {
  eleventyConfig.setWatchThrottleWaitTime(500);

  // Because Node has been given module hooks for TypeScript (see tsc-hooks.js),
  // TS files can be aliased to the JS template language.
  eleventyConfig.addExtension(["11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
  });

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
      output: "_site",

      // But layouts is interpreted as being relative to the input directory. 🙁
      layouts: "../layouts",
    },

    templateFormats: ["11ty.js", "md"],
  };
};
