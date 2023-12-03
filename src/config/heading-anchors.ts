import type { UserConfig } from "@11ty/eleventy";

// @ts-expect-error - ts(1479) - This is straight up wrong; the package is
// available as both CJS and ESM.
import markdownItAnchor from "markdown-it-anchor";

export function headingAnchorsConfig(eleventyConfig: UserConfig) {
  // @ts-expect-error - ts(1479) - This import is only being used as a type; I
  // feel like that shouldn't trigger this error.
  let slugify: typeof import("@sindresorhus/slugify").default | null = null;

  // 11ty won't support ES modules or async/await until 3.0. This hack
  // introduces a race condition, but hasn't failed yet.
  import("@sindresorhus/slugify").then((module) => (slugify = module.default));

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

      slugify: (text) => {
        if (!slugify) {
          throw new Error("You're the victim of a race condition; slugify hasn't finished loading.");
        }

        return slugify(text);
      },
    });
  });
}
