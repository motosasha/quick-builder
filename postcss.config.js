import { builderConfig } from "./builder.config.js";
import { projectConfig } from "./project.config.js";

export default {
  plugins: {
    "postcss-import": {},
    autoprefixer: { flexbox: false, grid: false },
    "postcss-pxtorem": {
      rootValue: projectConfig.pxToRemRootValue,
      unitPrecision: projectConfig.pxToRemUnitPrecision,
      propList: projectConfig.pxToRemPropList,
      selectorBlackList: projectConfig.pxToRemSelectorBlackList,
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
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
