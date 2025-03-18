import { projectConfig } from "./project.config.js";

const { assetsDir, outputDir, removeSvgAttr, svgAlias, svgFileName } = projectConfig;
const fromObj = {
  root: "/",
  source: "src",
  get pages() {
    return `${this.source}/pages`;
  },
  get layouts() {
    return `${this.source}/layouts`;
  },
  get components() {
    return `${this.source}/components`;
  },
  get styles() {
    return `${this.source}/styles`;
  },
  get scripts() {
    return `${this.source}/scripts`;
  },
  get data() {
    return `${this.source}/data`;
  },
  get icons() {
    return `${this.source}/icons`;
  },
  get service() {
    return `${this.source}/service`;
  },
};
const htmlPathObj = {
  root: assetsDir,
  js: assetsDir,
  css: assetsDir,
  img: assetsDir,
  fonts: assetsDir,
};
const cssPathObj = {
  root: assetsDir,
  img: assetsDir,
  fonts: assetsDir,
};

export const builderConfig = {
  // where we get the sources from
  from: fromObj,

  // paths for markup
  paths: {
    pug: {
      root: `/${htmlPathObj.root}/`,
      js: `/${htmlPathObj.js}/js/`,
      css: `/${htmlPathObj.css}/css/`,
      img: `/${htmlPathObj.img}/img/`,
      fonts: `/${htmlPathObj.fonts}/fonts/`,
      get icon() {
        return `/${svgAlias}#`;
      },
    },
    style: {
      root: `/${cssPathObj.root}/`,
      img: `/${cssPathObj.img}/img/`,
      fonts: `/${cssPathObj.fonts}/fonts/`,
      get icon() {
        return `/${svgAlias}#`;
      },
    },
    pages: `/`,
  },

  // options for svg sprite
  svgSpriteOptions: {
    prefix: false,
    route: svgAlias,
    output: {
      filename: `img/${svgFileName}.[hash][extname]`,
      name: `${svgFileName}.svg`,
      view: true,
      use: true,
    },
    svgo: {
      multipass: true,
      plugins: [
        {
          name: "cleanupIds",
          active: true,
          params: {
            minify: true,
          },
        },
        {
          name: "removeAttrs",
          params: {
            attrs: removeSvgAttr,
            elemSeparator: ":",
            preserveCurrentColor: true,
          },
        },
        {
          name: "removeStyleElement",
          active: true,
        },
        {
          name: "removeViewBox",
          active: true,
        },
      ],
    },
    injectSvgOnDev: true,
  },

  // pretty-html options
  prettyOption: {
    inDir: outputDir,
    html: {
      enabled: true,
      options: {
        editorconfig: true,
        indent_size: 2,
        indent_char: " ",
        indent_inner_html: true,
        indent_scripts: "normal",
        inline: ["strong"],
        extra_liners: ["head", "body", "/html"],
        preserve_newlines: true,
        unformatted: ["code", "em", "strong", "span", "i", "b", "pre"],
      },
    },
    js: {
      enabled: false,
    },
    css: {
      enabled: false,
    },
  },

  // regexp
  classRegexp:
    /(?<!extends.*)(?<!include.*)(?<![=!].*)(?<!\/\/.*)\s*(\.[a-zA-Z0-9_-]+|\+[a-zA-Z0-9_-]+|class="[\w\s-]+|class='[\w\s-]+)/g,
  templateRegexp: /(?<=extends.*layouts\/).*.pug/g,
  filesRegexp: /\.(png|jpg|jpeg|gif|webp)$/,

  // message
  doNotEditMsg: `
  ВНИМАНИЕ! Этот файл генерируется автоматически.
  Любые изменения этого файла будут потеряны при следующей компиляции.

`,

  // ignored directories
  serverIgnored: ["**/.idea/**", "**/.vscode/**", "**/temp/**"],

  // debugging
  isDebug: false,
};
