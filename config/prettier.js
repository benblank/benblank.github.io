const prettier = require("prettier");

module.exports = (eleventyConfig) => {
  eleventyConfig.addTransform("prettier", function prettify(content) {
    if (this.page.outputPath?.endsWith(".html")) {
      return prettier.format(content, { filepath: this.page.outputPath });
    }

    return content;
  });
};
