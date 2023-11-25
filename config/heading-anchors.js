const markdownItAnchor = require("markdown-it-anchor");

module.exports = (eleventyConfig) => {
  let slugify = null;

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
};
