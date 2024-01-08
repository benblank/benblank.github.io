import h from "vhtml";

export default class BlogPostLayout {
  data(): Record<string, unknown> {
    return { layout: "default", section: "535's Blog" };
  }

  render({ content, title }: Record<string, unknown>) {
    return (
      <article>
        <h1>{title}</h1>
        {content}
      </article>
    );
  }
}
