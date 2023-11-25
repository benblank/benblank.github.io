class BlogPostLayout {
  data() {
    return { layout: "default", section: "535's Blog" };
  }

  render({ content, title }) {
    return `
      <article>
        <h1>${title}</h1>

        ${content}
      </article>
    `;
  }
}

module.exports = BlogPostLayout;
