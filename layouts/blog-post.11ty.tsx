import h from "vhtml";

export default class BlogPostLayout {
  data(): Record<string, unknown> {
    return { layout: "default", section: "535's Blog" };
  }

  render({ content, title }: Record<string, unknown>) {
    return (
      // I really like the syntax highlighing which comes with JSX (versus
      // template strings), but I have to question whether it's worth it if I
      // end up needing to write stuff like this.
      <article
        dangerouslySetInnerHTML={{ __html: <h1>{title}</h1> + content }}
      />
    );
  }
}
