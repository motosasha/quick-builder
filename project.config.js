export const projectConfig = {
  projectName: "/quick-builder/",

  assetsDir: "" || "assets",
  outputDir: "build",

  // style imports layers
  styleLayers: ["reset", "base", "atoms", "molecules", "edging", "organisms", "overrides"],
  style: {
    reset: [
      "sanitize.css/sanitize.css",
      "sanitize.css/forms.css",
      "sanitize.css/assets.css",
      "sanitize.css/typography.css",
      "sanitize.css/reduce-motion.css",
    ],
    base: [
      "@styles/base/variables",
      "@styles/base/common",
      // "@styles/base/mixins",
      // "@styles/base/vendor",
      "@styles/base/fonts",
      // "@styles/base/animations"
      // "somePackage/dist/somePackage.css", // for "node_modules/somePackage/dist/somePackage.css",
    ],
  },
  // always add blocks — object of style levels with arrays of strings (blockNames), example:
  // alwaysAddBlocks: {
  //   atoms: ["blockNameOne", "blockNameTwo"],
  //   edging: ["blockNameThree"],
  //   ...
  // }
  alwaysAddBlocks: {},
  // ignored blocks
  ignoredBlocks: ["no-js", "content-filler"],
  // autoprefixer option
  autoprefixerOption: { flexbox: false, grid: false },
  // pxToRem options
  pxToRemOptions: {
    rootValue: 16,
    unitPrecision: 5,
    propList: ["font", "font-size", "line-height", "letter-spacing"],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0,
  },
  // strategy
  strategy: "mobile-first", // ["mobile-first", "desktop-first"]

  // helpers scripts
  addScripts: [
    {
      path: "@scripts/helpers/remove-no-js.js",
      isActive: true,
    },
    {
      path: "@scripts/helpers/vh-fix.js",
      isActive: true,
    },
    {
      path: "@scripts/helpers/scroll-size.js",
      isActive: true,
    },
    {
      path: "@scripts/helpers/get-browser-os.js",
      isActive: true,
    },
    {
      path: "@scripts/helpers/is-touch.js",
      isActive: true,
    },
  ],

  //
  removeSvgAttr: ["symbol:width", "symbol:height"], // ["stroke-width"]
  svgAlias: "_svgSprite_",
  svgFileName: "svgSprite",

  // navigation
  includeProjectNav: true,
};
