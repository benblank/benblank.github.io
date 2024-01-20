declare type LiquidTagCallback = import("./types.d.ts").LiquidTagCallback;
declare type PassthroughCopyOptions = import("./types.d.ts").PassthroughCopyOptions;
declare type Plugin = import("./types.d.ts").Plugin;
declare type TransformCallback = import("./types.d.ts").TransformCallback;
declare type UnknownFunction = import("./types.d.ts").UnknownFunction;

declare module "@11ty/eleventy/src/UserConfig.js" {
  import { DateTime } from "luxon";
  import MarkdownIt from "markdown-it";

  import AsyncEventEmitter from "@11ty/eleventy/src/Util/AsyncEventEmitter.js";
  import BenchmarkManager from "@11ty/eleventy/src/BenchmarkManager.js";

  /** API to expose configuration options in user-land configuration files */
  export default class UserConfig {
    constructor();
    reset(): void;

    // ======== // Properties revealed by the reset implementation:

    events: AsyncEventEmitter;

    benchmarkManager: BenchmarkManager;
    benchmarks: { config: BenchmarkGroup; aggregate: BenchmarkGroup };

    collections: Record<unknown, unknown>;
    precompiledCollections: Record<unknown, unknown>;
    templateFormats: unknown;

    liquidOptions: Record<unknown, unknown>;
    liquidTags: Record<unknown, unknown>;
    liquidFilters: Record<unknown, unknown>;
    liquidShortcodes: Record<unknown, unknown>;
    liquidPairedShortcodes: Record<unknown, unknown>;

    nunjucksEnvironmentOptions: Record<unknown, unknown>;
    nunjucksPrecompiledTemplates: Record<unknown, unknown>;
    nunjucksFilters: Record<unknown, unknown>;
    nunjucksAsyncFilters: Record<unknown, unknown>;
    nunjucksTags: Record<unknown, unknown>;
    nunjucksGlobals: Record<unknown, unknown>;
    nunjucksShortcodes: Record<unknown, unknown>;
    nunjucksAsyncShortcodes: Record<unknown, unknown>;
    nunjucksPairedShortcodes: Record<unknown, unknown>;
    nunjucksAsyncPairedShortcodes: Record<unknown, unknown>;

    javascriptFunctions: Record<unknown, unknown>;
    markdownHighlighter: unknown | null;
    libraryOverrides: Record<unknown, unknown>;

    passthroughCopies: Record<unknown, unknown>;
    layoutAliases: Record<unknown, unknown>;
    layoutResolution: boolean;

    linters: Record<unknown, unknown>;
    transforms: Record<string, TransformCallback>;
    activeNamespace: string;
    DateTime: typeof DateTime;
    dynamicPermalinks: boolean;

    useGitIgnore: boolean;

    ignores: Set<string>;
    watchIgnores: Set<string>;

    dataDeepMerge: boolean;
    extensionMap: Set<unknown>;
    watchJavaScriptDependencies: boolean;
    additionalWatchTargets: Array<unknown>;
    serverOptions: Record<unknown, unknown>;
    globalData: Record<unknown, unknown>;
    chokidarConfig: Record<unknown, unknown>;
    watchThrottleWaitTime: number;

    dataExtensions: Map<unknown, unknown>;

    quietMode: boolean;

    plugins: Array<unknown>;

    useTemplateCache: boolean;
    dataFilterSelectors: Set<unknown>;

    libraryAmendments: Record<unknown, unknown>;
    serverPassthroughCopyBehavior: "copy" | "passthrough";
    urlTransforms: Array<unknown>;

    dataFileSuffixesOverride: false | Array<unknown>;
    dataFileDirBaseNameOverride: false | string;

    // this.frontMatterParsingOptions = {
    // 	// Set a project-wide default.
    // 	// language: "yaml",

    // 	// Supplementary engines
    // 	engines: {
    // 		node: (frontMatterCode, { filePath }) => {
    // 			let vm = new RetrieveGlobals(frontMatterCode, {
    // 				filePath,
    // 				// ignored if vm.Module is stable (or --experimental-vm-modules)
    // 				transformEsmImports: true,
    // 			});

    // 			// Future warning until vm.Module is stable:
    // 			// If the frontMatterCode uses `import` this uses the `experimentalModuleApi`
    // 			// option in node-retrieve-globals to workaround https://github.com/zachleat/node-retrieve-globals/issues/2
    // 			let data = {
    // 				page: {
    // 					// Theoretically fileSlug and filePathStem could be added here but require extensionMap
    // 					inputPath: filePath,
    // 				},
    // 			};

    // 			// this is async, but it’s handled in Eleventy upstream.
    // 			return vm.getGlobalContext(data, {
    // 				reuseGlobal: true,
    // 				dynamicImport: true,
    // 				// addRequire: true,
    // 			});
    // 		},
    // 	},
    // };

    // ======== //

    // TODO: @throws {UserConfigError}
    versionCheck(compatibleRange: string): void;
    on: typeof AsyncEventEmitter.prototype.on;
    emit: typeof AsyncEventEmitter.prototype.emit;

    /**
     * This is a method for plugins, probably shouldn’t use this in projects.
     *
     * Projects should use `setLibrary` as documented here:
     * https://github.com/11ty/eleventy/blob/master/docs/engines/markdown.md#use-your-own-options
     */
    addMarkdownHighlighter(highlightFn: unknown): void;

    addLiquidTag(name: string, tagFn: LiquidTagCallback);
    addLiquidFilter(name: string, callback: UnknownFunction): void;
    addNunjucksAsyncFilter(name: string, callback: UnknownFunction): void;
    addNunjucksFilter(name: string, callback: UnknownFunction, isAsync = false): void;
    addHandlebarsHelper(name: string, callback: UnknownFunction): void;
    addFilter(name: string, callback: UnknownFunction): void;
    addAsyncFilter(name: string, callback: UnknownFunction): void;
    getFilter(name: string): UnknownFunction;
    addNunjucksTag(name: string, tagFn: UnknownFunction): void;
    addGlobalData(name: string, data: unknown): ThisType;
    addNunjucksGlobal(name: string, globalType): void;
    addTransform(name: string, callback: TransformCallback): void;
    addLinter(name: string, callback: UnknownFunction): void;
    addLayoutAlias(from: unknown, to: unknown): void;
    setLayoutResolution(resolution: boolean): void;
    enableLayoutResolution(): void;
    getCollections(): unknown;
    addCollection(name: string, callback: UnknownFunction): void;
    addPlugin<T>(plugin: Plugin<T>, options?: Record<unknown, unknown>): T | undefined;
    getNamespacedName(name: string): string;
    async namespace(pluginNamespace?: string, callback: UnknownFunction): Promise<void>;

    /**
     * Adds a path to a file or directory to the list of pass-through copies
     * which are copied as-is to the output.
     *
     * @param fileOrDir The path to the file or directory that should be copied.
     * OR an object where the key is the input glob and the property is the
     * output directory
     * @param copyOptions options for recursive-copy. see
     * https://www.npmjs.com/package/recursive-copy#arguments default options
     * are defined in TemplatePassthrough copyOptionsDefault
     * @returns a reference to the `EleventyConfig` object.
     */
    addPassthroughCopy(fileOrDir: string | Record<string, string>, copyOptions: PassthroughCopyOptions = {}): ThisType;

    setTemplateFormats(templateFormats: unknown): void;
    addTemplateFormats(templateFormats: unknown): void;

    // TODO?: restrict to valid engine names
    // TODO: overrides for library instance types
    setLibrary(engineName: string, libraryInstance: unknown): void;

    // TODO?: restrict to valid engine names
    // TODO: overrides for callback library types
    amendLibrary(engineName: "md", callback: (md: MarkdownIt) => void): void;
    amendLibrary(engineName: string, callback: UnknownFunction): void;

    setPugOptions(): void;
    setLiquidOptions(options: unknown): void;
    setNunjucksEnvironmentOptions(options: unknown): void;
    setNunjucksPrecompiledTemplates(templates: unknown): void;
    setEjsOptions(): void;
    setDynamicPermalinks(enabled: boolean);
    setUseGitIgnore(enabled: boolean): void;
    addShortcode(name: string, callback: UnknownFunction): void;
    addAsyncShortcode(name: string, callback: UnknownFunction): void;
    addNunjucksAsyncShortcode(name: string, callback: UnknownFunction): void;
    addNunjucksShortcode(name: string, callback: UnknownFunction, isAsync = false): void;
    addLiquidShortcode(name: string, callback: UnknownFunction): void;
    addHandlebarsShortcode(): void;
    addPairedShortcode(name: string, callback: UnknownFunction): void;
    addPairedAsyncShortcode(name: string, callback: UnknownFunction): void;
    addPairedNunjucksAsyncShortcode(name: string, callback: UnknownFunction): void;
    addPairedNunjucksShortcode(name: string, callback: UnknownFunction, isAsync = false): void;
    addPairedLiquidShortcode(name: string, callback: UnknownFunction): void;
    addPairedHandlebarsShortcode(): void;
    addJavaScriptFunction(name: string, callback: UnknownFunction): void;
    setDataDeepMerge(deepMerge: boolean): void;
    isDataDeepMergeModified(): boolean;
    addWatchTarget(additionalWatchTargets: unknown): void;
    setServerOptions(options: Record<unknown, unknown> = {}, override = false): void;
    setBrowserSyncConfig(): void;
    setChokidarConfig(options: Record<unknown, unknown> = {}): void;
    setWatchThrottleWaitTime(time = 0): void;
    setFrontMatterParsingOptions(options: Record<unknown, unknown> = {}): void;
    setQuietMode(quietMode: boolean): void;
    addExtension(fileExtension: string | ReadonlyArray<string>, options: Record<unknown, unknown> = {}): void;
    addDataExtension(extensionList: string, { parser }: { parser: UnknownFunction }): void;
    setUseTemplateCache(bypass: boolean): void;
    setPrecompiledCollections(collections: unknown): void;
    setServerPassthroughCopyBehavior(behavior: "copy" | "passthrough"): void;
    addUrlTransform(callback: UnknownFunction): void;
    setDataFileSuffixes(suffixArray: Array<unknown>): void;
    setDataFileBaseName(baseName: unknown): void;

    getMergingConfigObject(): {
      templateFormats: typeof UserConfig.prototype.templateFormats;
      templateFormatsAdded: typeof UserConfig.prototype.templateFormatsAdded;
      transforms: typeof UserConfig.prototype.transforms;
      linters: typeof UserConfig.prototype.linters;
      globalData: typeof UserConfig.prototype.globalData;
      layoutAliases: typeof UserConfig.prototype.layoutAliases;
      layoutResolution: typeof UserConfig.prototype.layoutResolution;
      passthroughCopies: typeof UserConfig.prototype.passthroughCopies;
      liquidOptions: typeof UserConfig.prototype.liquidOptions;
      liquidTags: typeof UserConfig.prototype.liquidTags;
      liquidFilters: typeof UserConfig.prototype.liquidFilters;
      liquidShortcodes: typeof UserConfig.prototype.liquidShortcodes;
      liquidPairedShortcodes: typeof UserConfig.prototype.liquidPairedShortcodes;
      nunjucksEnvironmentOptions: typeof UserConfig.prototype.nunjucksEnvironmentOptions;
      nunjucksPrecompiledTemplates: typeof UserConfig.prototype.nunjucksPrecompiledTemplates;
      nunjucksFilters: typeof UserConfig.prototype.nunjucksFilters;
      nunjucksAsyncFilters: typeof UserConfig.prototype.nunjucksAsyncFilters;
      nunjucksTags: typeof UserConfig.prototype.nunjucksTags;
      nunjucksGlobals: typeof UserConfig.prototype.nunjucksGlobals;
      nunjucksAsyncShortcodes: typeof UserConfig.prototype.nunjucksAsyncShortcodes;
      nunjucksShortcodes: typeof UserConfig.prototype.nunjucksShortcodes;
      nunjucksAsyncPairedShortcodes: typeof UserConfig.prototype.nunjucksAsyncPairedShortcodes;
      nunjucksPairedShortcodes: typeof UserConfig.prototype.nunjucksPairedShortcodes;
      javascriptFunctions: typeof UserConfig.prototype.javascriptFunctions;
      markdownHighlighter: typeof UserConfig.prototype.markdownHighlighter;
      libraryOverrides: typeof UserConfig.prototype.libraryOverrides;
      dynamicPermalinks: typeof UserConfig.prototype.dynamicPermalinks;
      useGitIgnore: typeof UserConfig.prototype.useGitIgnore;
      ignores: typeof UserConfig.prototype.ignores;
      watchIgnores: typeof UserConfig.prototype.watchIgnores;
      dataDeepMerge: typeof UserConfig.prototype.dataDeepMerge;
      watchJavaScriptDependencies: typeof UserConfig.prototype.watchJavaScriptDependencies;
      additionalWatchTargets: typeof UserConfig.prototype.additionalWatchTargets;
      serverOptions: typeof UserConfig.prototype.serverOptions;
      chokidarConfig: typeof UserConfig.prototype.chokidarConfig;
      watchThrottleWaitTime: typeof UserConfig.prototype.watchThrottleWaitTime;
      frontMatterParsingOptions: typeof UserConfig.prototype.frontMatterParsingOptions;
      dataExtensions: typeof UserConfig.prototype.dataExtensions;
      extensionMap: typeof UserConfig.prototype.extensionMap;
      quietMode: typeof UserConfig.prototype.quietMode;
      events: typeof UserConfig.prototype.events;
      benchmarkManager: typeof UserConfig.prototype.benchmarkManager;
      plugins: typeof UserConfig.prototype.plugins;
      useTemplateCache: typeof UserConfig.prototype.useTemplateCache;
      precompiledCollections: typeof UserConfig.prototype.precompiledCollections;
      dataFilterSelectors: typeof UserConfig.prototype.dataFilterSelectors;
      libraryAmendments: typeof UserConfig.prototype.libraryAmendments;
      serverPassthroughCopyBehavior: typeof UserConfig.prototype.serverPassthroughCopyBehavior;
      urlTransforms: typeof UserConfig.prototype.urlTransforms;
      "override:dataFileSuffixes"?: Exclude<typeof UserConfig.prototype.dataFileSuffixesOverride, false>;
      dataFileDirBaseNameOverride?: Exclude<typeof UserConfig.prototype.dataFileDirBaseNameOverride, false>;
    };
  }
}
