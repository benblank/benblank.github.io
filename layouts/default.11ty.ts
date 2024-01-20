export default class DefaultLayout {
  data(): Record<string, unknown> {
    return { title: "535's Place" };
  }

  render({ content, eleventy, section, title }: Record<string, unknown>) {
    // @ts-expect-error
    const { generator } = eleventy;

    return `
      <!doctype html>
      <html>
        <head>
          <title>${title}${section ? " — " + section : ""}</title>
          <meta name="generator" content="${generator}">
        </head>

        <body>${content}</body>
      </html>
    `;
  }
}
