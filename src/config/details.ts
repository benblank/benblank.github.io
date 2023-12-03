import type { UserConfig } from "@11ty/eleventy";
import markdownItContainer from "markdown-it-container";

const DETAILS_PATTERN = /^details\s+(.*)$/;

export function detailsConfig(eleventyConfig: UserConfig) {
  // Configures the markdown-it-container plugin to produce <details> blocks,
  // which not only simplifies creating them, but also allows easily using
  // Markdown formatting in the summary.

  eleventyConfig.amendLibrary("md", (md) => {
    const markdownItContainerConfig: markdownItContainer.ContainerOpts = {
      validate(params) {
        return DETAILS_PATTERN.test(params.trim());
      },

      render(tokens, index) {
        const token = tokens[index];

        if (!token) {
          throw new Error(`Index ${index} out of range.`);
        }

        const match = token.info.trim().match(DETAILS_PATTERN);

        if (!match) {
          throw new Error("Can't happen: rendering token which does not validate.");
        }

        if (token.nesting === 1) {
          // I'm not 100% confident that renderInline is the best way to do
          // this, but it's certainly good enough for now.
          return "<details><summary>" + md.renderInline(match[1]!) + "</summary>\n";
        } else {
          return "</details>\n";
        }
      },
    };

    md.use(markdownItContainer, "details", markdownItContainerConfig);
  });
}
