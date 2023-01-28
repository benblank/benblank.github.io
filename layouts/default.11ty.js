class DefaultLayout {
  data() {
    return { title: "535's Place" };
  }

  render({ content, section, title }) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>${title}${section ? " — " + section : ""}</title>
        </head>

        <body>${content}</body>
      </html>
    `;
  }
}

module.exports = DefaultLayout;
