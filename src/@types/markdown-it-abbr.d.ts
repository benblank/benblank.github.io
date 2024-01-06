declare module "markdown-it-abbr" {
  import type MarkdownIt from "markdown-it";

  declare function markdownItAbbr(md: MarkdownIt): void;

  export = markdownItAbbr;
}
