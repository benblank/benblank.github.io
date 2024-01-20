declare module "@11ty/eleventy/src/Eleventy.js" {
  import type { default as TemplateConfig } from "@11ty/eleventy/src/TemplateConfig.js";

  export class Eleventy {
    constructor(input, output, options?: Record<unknown, unknown>, eleventyConfig?: TemplateConfig);

    // ======== // Properties declared inside the constructor:

    /** Holds the path to the input directory. */
    rawInput: string;

    /** @member {String} - Holds the path to the output directory. */
    rawOutput: string;

    /** Override the config instance (for centralized config re-use) */
    eleventyConfig: TemplateConfig | null;

    /** Options object passed to the Eleventy constructor */
    options: Record<unknown, unknown>;

    /** The top level directory the site pretends to reside in */
    pathPrefix: string;

    /** The path to Eleventy's config file. */
    configPath: string;

    /** Called via CLI (`cli`) or Programmatically (`script`) */
    source: "cli" | "script";

    /** One of build, serve, or watch */
    runMode: "build" | "serve" | "watch";

    /** Is Eleventy running in dry mode? */
    isDryRun: boolean;

    /** Does the init() method still need to be run (or hasn’t finished yet) */
    needsInit: boolean;

    /** Subset of template types. */
    formatsOverride: Array<string>;

    /** Is this an incremental build? (only operates on a subset of input files) */
    isIncremental: boolean;

    /** If an incremental build, this is the file we’re operating on. */
    programmaticApiIncrementalFile: string | null | undefined;

    /** Should we process files on first run? (The --ignore-initial feature) */
    isRunInitialBuild: boolean;

    // ======== //

    async initializeConfig(): Promise<void>;
    getNewTimestamp(): number;

    disableLogger(...args: Array<unknown>): void;
    executeBuild(...args: Array<unknown>): void;
    getChokidarConfig(...args: Array<unknown>): void;
    getEnvironmentVariableValues(...args: Array<unknown>): void;
    getHelp(...args: Array<unknown>): void;
    getVersion(...args: Array<unknown>): void;
    getWatchedFiles(...args: Array<unknown>): void;
    init(...args: Array<unknown>): void;
    initWatch(...args: Array<unknown>): void;
    initializeEnvironmentVariables(...args: Array<unknown>): void;
    logFinished(...args: Array<unknown>): void;
    resetConfig(...args: Array<unknown>): void;
    restart(...args: Array<unknown>): void;
    serve(...args: Array<unknown>): void;
    setDryRun(...args: Array<unknown>): void;
    setFormats(...args: Array<unknown>): void;
    setIgnoreInitial(...args: Array<unknown>): void;
    setIncrementalBuild(...args: Array<unknown>): void;
    setIncrementalFile(...args: Array<unknown>): void;
    setInputDir(...args: Array<unknown>): void;
    setIsVerbose(...args: Array<unknown>): void;
    setPathPrefix(...args: Array<unknown>): void;
    setRunMode(...args: Array<unknown>): void;
    shouldTriggerConfigReset(...args: Array<unknown>): void;
    stopWatch(...args: Array<unknown>): void;
    toJSON(...args: Array<unknown>): void;
    toNDJSON(...args: Array<unknown>): void;
    watch(...args: Array<unknown>): void;
    write(...args: Array<unknown>): void;
    static getHelp(...args: Array<unknown>): void;
    static getVersion(...args: Array<unknown>): void;
  }

  export default Eleventy;

  export function EleventyHtmlBasePlugin(eleventyConfig: unknown, defaultOptions: unknown): unknown;
  export function EleventyI18nPlugin(eleventyConfig: unknown, opts: unknown): unknown;
  export function EleventyRenderPlugin(eleventyConfig: unknown, options: unknown): unknown;

  export namespace EleventyHtmlBasePlugin {
    function applyBaseToUrl(url: unknown, base: unknown, opts: unknown): unknown;
  }

  export namespace EleventyI18nPlugin {
    function Comparator(...args: Array<unknown>): unknown;
    function LangUtils(...args: Array<unknown>): unknown;

    namespace Comparator {
      function isLangCode(...args: Array<unknown>): void;
      function matchLanguageFolder(...args: Array<unknown>): void;
      function urlHasLangCode(...args: Array<unknown>): void;
    }

    namespace LangUtils {
      function getLanguageCodeFromInputPath(...args: Array<unknown>): void;
      function getLanguageCodeFromUrl(...args: Array<unknown>): void;
      function swapLanguageCode(...args: Array<unknown>): void;
      function swapLanguageCodeNoCheck(...args: Array<unknown>): void;
    }
  }

  export namespace EleventyRenderPlugin {
    class RenderManager {
      constructor(...args: Array<unknown>);
      compile(...args: Array<unknown>): void;
      config(...args: Array<unknown>): void;
      getData(...args: Array<unknown>): void;
      init(...args: Array<unknown>): void;
      render(...args: Array<unknown>): void;
    }

    function File(
      inputPath: unknown,
      { templateConfig, extensionMap, config }: unknown,
      templateLang: unknown,
    ): unknown;
    function String(content: unknown, templateLang: unknown, { templateConfig, extensionMap }: unknown): unknown;
  }
}
