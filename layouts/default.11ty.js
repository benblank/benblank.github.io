class DefaultLayout {
  data() {
    return { title: "535's Place" };
  }

  render({ content, eleventy, section, title }) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>${title}${section ? " — " + section : ""}</title>
          <meta name="generator" content="${eleventy.generator}">
        </head>

        <body>${content}</body>
      </html>
    `;
  }
}

module.exports = DefaultLayout;
