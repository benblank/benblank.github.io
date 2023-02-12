const markdownItFootnote = require("markdown-it-footnote");

const anchorsConfig = require("./config/anchors.js");
const codeHighlightConfig = require("./config/code-highlight.js");
const deepMerge = require("./config/deep-merge.js");
const detailsConfig = require("./config/container-details.js");
const prettierConfig = require("./config/prettier.js");

module.exports = (eleventyConfig) => {
  let result = {
    dir: {
      input: "content",
      layouts: "../layouts",
      output: "_site",
    },

    templateFormats: ["11ty.js", "md"],
  };

  eleventyConfig.addPassthroughCopy({ static: "." }, { dot: true });
  eleventyConfig.amendLibrary("md", (md) => md.use(markdownItFootnote));

  result = deepMerge(result, anchorsConfig(eleventyConfig));
  result = deepMerge(result, codeHighlightConfig(eleventyConfig));
  result = deepMerge(result, detailsConfig(eleventyConfig));
  result = deepMerge(result, prettierConfig(eleventyConfig));

  return result;
};
