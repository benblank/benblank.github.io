const prettier = require("prettier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ static: "." }, { dot: true });

  eleventyConfig.addTransform("prettier", function prettify(content) {
    if (this.page.outputPath?.endsWith(".html")) {
      return prettier.format(content, { filepath: this.page.outputPath });
    }

    return content;
  });

  return {
    dir: {
      input: "content",
      layouts: "../layouts",
      output: "_site",
    },

    templateFormats: ["11ty.js", "md"],
  };
};
