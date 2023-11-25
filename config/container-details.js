const markdownItContainer = require("markdown-it-container");

module.exports = (eleventyConfig) => {
  // Configures the markdown-it-container plugin to produce <details> blocks,
  // which not only simplifies creating them, but also allows easily using
  // Markdown formatting in the summary.

  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItContainer, "details", {
      validate(params) {
        return params.trim().match(/^details\s+(.*)$/);
      },

      render(tokens, index) {
        var m = tokens[index].info.trim().match(/^details\s+(.*)$/);

        if (tokens[index].nesting === 1) {
          // I'm not 100% confident that renderInline is the best way to do
          // this, but it's certainly good enough for now.
          return "<details><summary>" + md.renderInline(m[1]) + "</summary>\n";
        } else {
          return "</details>\n";
        }
      },
    });
  });
};
