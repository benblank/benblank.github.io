const markdownItHighlightJs = require("markdown-it-highlightjs");

module.exports = (eleventyConfig) => {
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItHighlightJs, { auto: false, code: false, ignoreIllegals: false });
  });
};
