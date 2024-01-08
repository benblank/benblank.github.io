export default class DefaultLayout {
  data() {
    return { layout: "base", styles: ["default.css"] };
  }

  render({ content }: { content: string }): string {
    return content;
  }
}
