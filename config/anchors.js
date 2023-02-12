const markdownItAnchor = require("markdown-it-anchor");
const slugify = require("@sindresorhus/slugify");

module.exports = (eleventyConfig) => {
  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItAnchor, { level: 2, permalink: markdownItAnchor.permalink.linkInsideHeader(), slugify });
  });
};
