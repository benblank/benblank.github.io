const markdownItAbbr = require("markdown-it-abbr");
const markdownItFootnote = require("markdown-it-footnote");

const codeHighlightConfig = require("./config/code-highlight.js");
const detailsConfig = require("./config/container-details.js");
const headingAnchorsConfig = require("./config/heading-anchors.js");
const prettierConfig = require("./config/prettier.js");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPassthroughCopy({ static: "." }, { dot: true });
  eleventyConfig.amendLibrary("md", (md) => md.use(markdownItAbbr));
  eleventyConfig.amendLibrary("md", (md) => md.use(markdownItFootnote));

  codeHighlightConfig(eleventyConfig);
  detailsConfig(eleventyConfig);
  headingAnchorsConfig(eleventyConfig);
  prettierConfig(eleventyConfig);

  return {
    dir: {
      input: "content",
      layouts: "../layouts",
      output: "_site",
    },

    templateFormats: ["11ty.js", "md"],
  };
};
