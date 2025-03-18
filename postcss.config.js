import { builderConfig } from "./builder.config.js";
import { projectConfig } from "./project.config.js";

export default {
  plugins: {
    "postcss-import": {},
    autoprefixer: projectConfig.autoprefixerOption,
    "postcss-pxtorem": projectConfig.pxToRemOptions,
    "postcss-replace": {
      commentsOnly: false,
      data: builderConfig.paths.style,
      pattern: "\/{{([^\\s]+?)}}\/",
    },
    "postcss-remove-duplicate-values": {
      preserveEmpty: true,
    },
    "postcss-sort-media-queries": {
      onlyTopLevel: true,
      sort: projectConfig.strategy,
    },
  },
};
