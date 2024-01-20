declare module "@11ty/eleventy/src/TemplateConfig.js" {
  export default class TemplateConfig {
    constructor(customRootConfig: unknown, projectConfigPath: unknown);
    setLogger(logger: unknown);

    /** Normalises local project config file path. */
    getLocalProjectConfigFile(): string;

    getLocalProjectConfigFiles(): Array<unknown>;
    inputDir: unknown;

    setProjectUsingEsm(isEsmProject: boolean): void;
    getIsProjectUsingEsm(): boolean;

    /** Resets the configuration. */
    async reset(): Promise<void>;

    /**
     * Resets the configuration while in watch mode.
     *
     * @todo Add implementation.
     */
    resetOnWatch(): void;

    /** Async-friendly init method. */
    async init(overrides: unknown): void;

    /** Force a reload of the configuration object. */
    async forceReloadConfig(): Promise<void>;

    /** Returns the config object. */
    getConfig(): Record<unknown, unknown>;

    /** Overwrites the config path. */
    async setProjectConfigPath(path: string): Promise<void>;

    /** Overwrites the path prefix. */
    setPathPrefix(pathPrefix: string): void;

    /** Gets the current path prefix denoting the root folder the output will be deployed to */
    getPathPrefix(): string;

    /** Bootstraps the config object. */
    async initializeRootConfig(): Promise<void>;

    /** Add additional overrides to the root config object, used for testing */
    appendToRootConfig(obj: Record<unknown, unknown>): void;

    /** Process the userland plugins from the Config */
    async processPlugins({ dir, pathPrefix }: { dir: unknown; pathPrefix: string }): Promise<void>;

    /** Fetches and executes the local configuration file */
    async requireLocalConfigFile(): Promise<Record<unknown, unknown>>;

    /** Merges different config files together. */
    async mergeConfig(): Promise<Record<unknown, unknown>>;

    get usesGraph(): GlobalDependencyMap;
    afterConfigMergeActions(eleventyConfig: unknown): void;
    get uses(): unknown;
  }
}
