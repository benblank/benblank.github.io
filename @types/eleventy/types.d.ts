export type LiquidTagCallback = (liquidEngine: unknown) => { parse: unknown; render: unknown };

// TODO?: better/official name
// TODO: figure out the whole localConfig / rootConfig / mergedConfig thing
export type LocalConfig = {
  templateFormats: Array<TemplateFormat>;
  pathPrefix: string;
  markdownTemplateEngine: string;
  htmlTemplateEngine: string;
  htmlOutputSuffix: string;

  dataFileSuffixes: Array<string>;
  dataFileDirBaseNameOverride: false | string;

  keys: {
    package: string;
    layout: string;
    permalink: string;
    permalinkRoot: string;
    engineOverride: string;
    computed: string;
  };

  dir: {
    input: string;
    includes: string;
    data: string;
    output: string;
    layouts: string;
  };

  /** @deprecated Use config.addHandlebarsHelper. */
  handlebarsHelpers: unknown;

  /** @deprecated use config.addNunjucksFilter */
  nunjucksFilters: unknown;
};

// This is the same as `CopyOptions` from recursive-copy, but that module
// doesn't actually export the interface and trying to extract it from the
// signature of an overloaded function is too much of a pain, so here, have a
// copy-and-paste.
export interface PassthroughCopyOptions {
  /**
   * Whether to overwrite destination files.
   */
  overwrite?: boolean;
  /**
   * Whether to expand symbolic links.
   */
  expand?: boolean;
  /**
   * Whether to copy files beginning with a `.`
   */
  dot?: boolean;
  /**
   * Whether to copy OS junk files (e.g. `.DS_Store`, `Thumbs.db`).
   */
  junk?: boolean;
  /**
   * Filter function / regular expression / glob that determines which files to copy (uses maximatch).
   */
  filter?: string | string[] | RegExp | ((path: string) => boolean);
  /**
   * Function that maps source paths to destination paths.
   */
  rename?: (path: string) => string;
  /**
   * Function that returns a transform stream used to modify file contents.
   */
  transform?: (src: string, dest: string, stats: Stats) => Stream | null | undefined;
  /**
   * Whether to return an array of copy results.
   *
   * Defaults to true.
   */
  results?: boolean;
  /**
   * Maximum number of simultaneous copy operations.
   *
   * Defaults to 255.
   */
  concurrency?: number;
  /**
   * Whether to log debug information.
   */
  debug?: boolean;
}

export type Plugin<T = unknown> =
  | UnknownFunction<T>
  | { configFunction?: UnknownFunction<T>; initArguments: Record<unknown, unknown> };

export type TemplateFormat = "liquid" | "md" | "njk" | "html" | "11ty.js";

export type TransformCallback = (content: string, outputPath: string) => string | Promise<string>;

// TODO: this should be replaced everywhere with more specific types, of course
export type UnknownFunction<T = unknown> = (...args: Array<unknown>) => T;
