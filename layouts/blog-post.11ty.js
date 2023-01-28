class BlogPostLayout {
  data() {
    return { layout: "default", section: "535's Blog" };
  }

  render({ content, title }) {
    return `
      <article>
        <h2>${title}</h2>

        ${content}
      </article>
    `;
  }
}

module.exports = BlogPostLayout;
