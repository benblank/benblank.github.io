/**
 * @file Parial typings for Eleventy.
 *
 * This file was created using dts-gen and augmented by hand. The typings are
 * only accurate insofar as I've needed them to be; most other things have been
 * set to `unknown`.
 */

import MarkdownIt from "markdown-it";
import type { EventEmitter } from "node:events";

// The recursive-copy module doesn't actually export this interface and trying
// to extract it from the signature of an overloaded function is too much of a
// pain, so here, have a copy-and-paste.
interface CopyOptions {
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

/** A value which may or may not be wrapped in a Promise. */
type MaybePromise<T> = T | Promise<T>;

declare module "@11ty/eleventy" {
  declare class Eleventy {
    constructor(...args: unknown[]);
    disableLogger(...args: unknown[]): void;
    executeBuild(...args: unknown[]): void;
    getChokidarConfig(...args: unknown[]): void;
    getEnvironmentVariableValues(...args: unknown[]): void;
    getHelp(...args: unknown[]): void;
    getNewTimestamp(...args: unknown[]): void;
    getVersion(...args: unknown[]): void;
    getWatchedFiles(...args: unknown[]): void;
    init(...args: unknown[]): void;
    initWatch(...args: unknown[]): void;
    initializeEnvironmentVariables(...args: unknown[]): void;
    logFinished(...args: unknown[]): void;
    resetConfig(...args: unknown[]): void;
    restart(...args: unknown[]): void;
    serve(...args: unknown[]): void;
    setDryRun(...args: unknown[]): void;
    setFormats(...args: unknown[]): void;
    setIgnoreInitial(...args: unknown[]): void;
    setIncrementalBuild(...args: unknown[]): void;
    setIncrementalFile(...args: unknown[]): void;
    setInputDir(...args: unknown[]): void;
    setIsVerbose(...args: unknown[]): void;
    setPathPrefix(...args: unknown[]): void;
    setRunMode(...args: unknown[]): void;
    setWatchTargets(...args: unknown[]): void;
    shouldTriggerConfigReset(...args: unknown[]): void;
    stopWatch(...args: unknown[]): void;
    toJSON(...args: unknown[]): void;
    toNDJSON(...args: unknown[]): void;
    watch(...args: unknown[]): void;
    write(...args: unknown[]): void;
    static EleventyEdgePlugin(eleventyConfig: unknown, opts: unknown): unknown;
    static EleventyHtmlBasePlugin(eleventyConfig: unknown, defaultOptions: unknown): unknown;
    static EleventyI18nPlugin(eleventyConfig: unknown, opts: unknown): unknown;
    static EleventyRenderPlugin(eleventyConfig: unknown, options: unknown): unknown;
    static EleventyServerlessBundlerPlugin(eleventyConfig: unknown, options: unknown): void;
    static getHelp(...args: unknown[]): void;
    static getVersion(...args: unknown[]): void;
  }

  declare namespace Eleventy {
    class EleventyServerless {
      constructor(...args: unknown[]);
      deleteEnvironmentVariables(...args: unknown[]): void;
      getConfigInfo(...args: unknown[]): void;
      getContentMap(...args: unknown[]): void;
      getOutput(...args: unknown[]): void;
      getProjectDir(...args: unknown[]): void;
      initializeEnvironmentVariables(...args: unknown[]): void;
      isServerlessUrl(...args: unknown[]): void;
      matchUrlPattern(...args: unknown[]): void;
      render(...args: unknown[]): void;
    }

    namespace EleventyHtmlBasePlugin {
      function applyBaseToUrl(url: unknown, base: unknown, opts: unknown): unknown;
    }

    namespace EleventyI18nPlugin {
      function Comparator(...args: unknown[]): unknown;
      function LangUtils(...args: unknown[]): unknown;

      namespace Comparator {
        function isLangCode(...args: unknown[]): void;
        function matchLanguageFolder(...args: unknown[]): void;
        function urlHasLangCode(...args: unknown[]): void;
      }

      namespace LangUtils {
        function getLanguageCodeFromInputPath(...args: unknown[]): void;
        function getLanguageCodeFromUrl(...args: unknown[]): void;
        function swapLanguageCode(...args: unknown[]): void;
        function swapLanguageCodeNoCheck(...args: unknown[]): void;
      }
    }

    namespace EleventyRenderPlugin {
      class RenderManager {
        constructor(...args: unknown[]);
        compile(...args: unknown[]): void;
        config(...args: unknown[]): void;
        getData(...args: unknown[]): void;
        render(...args: unknown[]): void;
      }

      function File(
        inputPath: unknown,
        { templateConfig, extensionMap, config }: unknown,
        templateLang: unknown,
      ): unknown;
      function String(content: unknown, templateLang: unknown, { templateConfig, extensionMap }: unknown): unknown;
    }
  }

  type GlobalPageData = {
    eleventy: {
      version: string;
      generator: string;

      env: {
        source: string;
        runMode: string;
        config: string;
        root: string;
        isServerless: boolean;
      };
    };

    layout: string;

    page: {
      date: string;
      inputPath: string;
      fileSlug: string;
      filePathStem: string;
      outputFileExtension: string;
      templateSyntax: string;
      url: string;
      outputPath: string;
    };

    collections: Record<string, unknown>;
    content: string;
    layoutContent: string;
  };

  type LocalConfig = {
    templateFormats: TemplateFormats;
    pathPrefix: string;
    markdownTemplateEngine: string;
    htmlTemplateEngine: string;
    htmlOutputSuffix: string;
    dataFileSuffixes: ReadonlyArray<string>;
    dataFileDirBaseNameOverride: string | false;

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
    /** @deprecated Use config.addNunjucksFilter. */
    nunjucksFilters: unknown;
  };

  type TemplateFormats = ReadonlyArray<string> | string | null | undefined;

  // TODO: sort all this out so that JavaScript templates can be properly typed.
  interface TemplateClass<TemplateData extends Record<string, unknown> = {}> {
    data?(): MaybePromise<TemplateData>;
    render?(data: TemplateData & GlobalPageData): MaybePromise<TemplateResult>;
  }

  type TemplateFunction = () => MaybePromise<TemplateResult>;
  type TemplateResult = string | Buffer;

  type Transform = (
    this: {
      inputPath: string;
      outputPath: string;
      url: string;

      // TODO: check whether this is the same as GlobalPageData.page
      page: Record<string, unknown>;
    },

    content: string,
    outputPath: string,
  ) => string | Promise<string>;

  interface UserConfig {
    reset(): void;
    versionCheck(compatibleRange?: string): void;
    on: typeof EventEmitter.prototype.on;
    emit: typeof EventEmitter.prototype.emit;
    addMarkdownHighlighter(highlightFn: MarkdownIt.Options["highlight"]): void;
    addLiquidTag(name: string, tagFn: (liquidEngine: unknown) => unknown): void;
    addLiquidFilter(name, callback): void;
    addNunjucksAsyncFilter(name, callback): void;
    addNunjucksFilter(name, callback, isAsync = false): void;
    addHandlebarsHelper(name, callback): void;
    addFilter(name, callback): void;
    addAsyncFilter(name, callback): void;
    getFilter(name): () => unknown;
    addNunjucksTag(name, tagFn): void;
    addGlobalData(name, data): UserConfig;
    addNunjucksGlobal(name, globalType): void;
    addTransform(name: string, callback: Transform): void;
    addLinter(name, callback): unknown;
    addLayoutAlias(from, to): unknown;
    setLayoutResolution(resolution): unknown;
    enableLayoutResolution(): unknown;
    getCollections(): unknown;
    addCollection(name, callback): unknown;
    addPlugin(plugin, options): unknown;
    getNamespacedName(name): unknown;
    namespace(pluginNamespace, callback): unknown;
    addPassthroughCopy(fileOrDir: string | Record<string, string>, copyOptions: CopyOptions = {}): UserConfig;
    addTemplateFormats(templateFormats: TemplateFormats): unknown;
    setTemplateFormats(templateFormats: TemplateFormats): unknown;
    setLibrary(engineName, libraryInstance): unknown;
    amendLibrary(engineName: "md", callback: (md: MarkdownIt) => void): void;
    amendLibrary(engineName: string, callback: (engine: unknown) => void): void;
    setPugOptions(options): unknown;
    setLiquidOptions(options): unknown;
    setNunjucksEnvironmentOptions(options): unknown;
    setNunjucksPrecompiledTemplates(templates): unknown;
    setEjsOptions(options): unknown;
    setDynamicPermalinks(enabled): unknown;
    setUseGitIgnore(enabled: boolean): void;
    addShortcode(name, callback): unknown;
    addAsyncShortcode(name, callback): unknown;
    addNunjucksAsyncShortcode(name, callback): unknown;
    addNunjucksShortcode(name, callback, isAsync = false): unknown;
    addLiquidShortcode(name, callback): unknown;
    addHandlebarsShortcode(name, callback): unknown;
    addPairedShortcode(name, callback): unknown;
    addPairedAsyncShortcode(name, callback): unknown;
    addPairedNunjucksAsyncShortcode(name, callback): unknown;
    addPairedNunjucksShortcode(name, callback, isAsync = false): unknown;
    addPairedLiquidShortcode(name, callback): unknown;
    addPairedHandlebarsShortcode(name, callback): unknown;
    addJavaScriptFunction(name, callback): unknown;
    setDataDeepMerge(deepMerge): unknown;
    isDataDeepMergeModified(): unknown;
    addWatchTarget(additionalWatchTargets): unknown;
    setWatchJavaScriptDependencies(watchEnabled): unknown;
    setServerOptions(options = {}, override = false): unknown;
    setBrowserSyncConfig(): unknown;
    setChokidarConfig(options = {}): unknown;
    setWatchThrottleWaitTime(time = 0): unknown;
    setFrontMatterParsingOptions(options = {}): unknown;
    setQuietMode(quietMode): unknown;
    addExtension(fileExtension, options = {}): unknown;
    addDataExtension(extensionList, parser): unknown;
    setUseTemplateCache(bypass): unknown;
    setPrecompiledCollections(collections): unknown;
    setServerPassthroughCopyBehavior(behavior): unknown;
    addUrlTransform(callback): unknown;
    setDataFileSuffixes(suffixArray): unknown;
    setDataFileBaseName(baseName): unknown;
    getMergingConfigObject(): unknown;

    // It isn't at all clear which of the below are meant to be internal. For
    // example, adding to and deleting from `.ignores` is documented but
    // `watchThrottleWaitTime` is clearly mean to be set using
    // .`setWatchThrottleWaitTime()`.

    activeNamespace: string;
    additionalWatchTargets: Array<unknown>;
    benchmarkManager: BenchmarkManager;
    benchmarks: { config: unknown; aggregate: unknown };
    chokidarConfig: Record<string, unknown>;
    collections: Record<string, unknown>;
    dataDeepMerge: boolean;
    dataExtensions: Map<unknown>;
    dataFileDirBaseNameOverride: boolean;
    dataFileSuffixesOverride: boolean;
    dataFilterSelectors: Set<unknown>;
    DateTime: unknown; // import("luxon").DateTime;
    dynamicPermalinks: boolean;
    ejsOptions: Record<string, unknown>;
    events: EventEmitter;
    extensionMap: Set<unknown>;
    globalData: Record<string, unknown>;
    handlebarsHelpers: Record<string, unknown>;
    handlebarsPairedShortcodes: Record<string, unknown>;
    handlebarsShortcodes: Record<string, unknown>;
    ignores: Set<string>;
    javascriptFunctions: Record<string, unknown>;
    layoutAliases: Record<string, unknown>;
    layoutResolution: boolean;
    libraryAmendments: Record<string, unknown>;
    libraryOverrides: Record<string, unknown>;
    linters: Record<string, unknown>;
    liquidFilters: Record<string, unknown>;
    liquidOptions: Record<string, unknown>;
    liquidPairedShortcodes: Record<string, unknown>;
    liquidShortcodes: Record<string, unknown>;
    liquidTags: Record<string, unknown>;
    markdownHighlighter: unknown;
    nunjucksAsyncFilters: Record<string, unknown>;
    nunjucksAsyncPairedShortcodes: Record<string, unknown>;
    nunjucksAsyncShortcodes: Record<string, unknown>;
    nunjucksEnvironmentOptions: Record<string, unknown>;
    nunjucksFilters: Record<string, unknown>;
    nunjucksGlobals: Record<string, unknown>;
    nunjucksPairedShortcodes: Record<string, unknown>;
    nunjucksPrecompiledTemplates: Record<string, unknown>;
    nunjucksShortcodes: Record<string, unknown>;
    nunjucksTags: Record<string, unknown>;
    passthroughCopies: Record<string, unknown>;
    plugins: Array<unknown>;
    precompiledCollections: Record<string, unknown>;
    pugOptions: Record<string, unknown>;
    quietMode: boolean;
    serverOptions: Record<string, unknown>;
    serverPassthroughCopyBehavior: "copy" | "passthrough";
    templateFormats: unknown;
    transforms: Record<string, unknown>;
    urlTransforms: Array<unknown>;
    useGitIgnore: boolean;
    useTemplateCache: boolean;
    watchIgnores: Set<string>;
    watchJavaScriptDependencies: boolean;
    watchThrottleWaitTime: number;
  }
}
