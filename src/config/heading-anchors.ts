import type { UserConfig } from "@11ty/eleventy";
import slugify from "@sindresorhus/slugify";
import markdownItAnchor from "markdown-it-anchor";

export function headingAnchorsConfig(eleventyConfig: UserConfig) {
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItAnchor, {
      level: 2,

      // NOTE: The accessibility of permalinks is a complex issue. See:
      //
      // https://www.codejam.info/2021/06/you-re-probably-doing-anchor-links-wrong.html
      // https://github.com/valeriangalliat/markdown-it-anchor#header-link
      permalink: markdownItAnchor.permalink.linkAfterHeader({
        // The default style is "visually-hidden".
        assistiveText: (title) => `Permalink to “${title}”`,
        visuallyHiddenClass: "visually-hidden",
      }),

      slugify,
    });
  });
}
