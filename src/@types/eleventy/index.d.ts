declare module "@11ty/eleventy" {
  import {
    Eleventy,
    EleventyHtmlBasePlugin,
    EleventyI18nPlugin,
    EleventyRenderPlugin,
  } from "@11ty/eleventy/src/Eleventy.js";

  export default Eleventy;
  export { Eleventy, EleventyHtmlBasePlugin, EleventyI18nPlugin, EleventyRenderPlugin };

  export type { default as TemplateConfig } from "@11ty/eleventy/src/TemplateConfig.js";
  export type { default as UserConfig } from "@11ty/eleventy/src/UserConfig.js";

  export declare type LiquidTagCallback = import("./types.d.ts").LiquidTagCallback;
  export declare type LocalConfig = import("./types.d.ts").LocalConfig;
  export declare type PassthroughCopyOptions = import("./types.d.ts").PassthroughCopyOptions;
  export declare type Plugin = import("./types.d.ts").Plugin;
  export declare type TransformCallback = import("./types.d.ts").TransformCallback;
  export declare type UnknownFunction = import("./types.d.ts").UnknownFunction;
}
