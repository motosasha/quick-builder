// configs
import { defineConfig } from "vite";
import { builderConfig } from "./builder.config.js";
import { projectConfig } from "./project.config.js";

// packages
import path from "node:path";
import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import beautify from "vite-plugin-beautify";
import vitePluginSvgSpriteMap from "@spiriit/vite-plugin-svg-spritemap";
import { viteStaticCopy } from "vite-plugin-static-copy";

// plugins
import writePugMixinsFile from "./plugins/vite-plugin-pug-mixins.js";
import vitePugLint from "./plugins/vite-plugin-pug-lint.js";
import hashGenerator from "./plugins/vite-plugin-hash-generator";
import replaceSvgHtml from "./plugins/vite-plugin-svg-replace";
import writeServiceFiles from "./plugins/vite-plugin-service-files.js";

// functions
import { createSpriteIconsList } from "./plugins/functions/createSpriteIconsList.js";
import { getCopyTargets } from "./plugins/functions/getCopyTargets.js";

const { from, svgSpriteOptions, prettyOption, serverIgnored } = builderConfig;
const { assetsDir, outputDir, projectName, svgAlias, svgFileName } = projectConfig;

export default defineConfig({
  base: process.env.MODE === "deploy" ? projectName : "/",
  build: {
    outDir: outputDir,
    assetsDir: assetsDir,
    rollupOptions: {
      output: {
        entryFileNames: `${assetsDir}/js/bundle.[hash].js`,
        chunkFileNames: `${assetsDir}/js/[name].[hash].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.name.endsWith(".css")) {
            return `${assetsDir}/css/[name].[hash][extname]`;
          }
          return `${assetsDir}/[name].[hash][extname]`;
        },
      },
    },
    manifest: true,
    modulePreload: false,
    sourcemap: false,
  },
  css: {
    devSourcemap: true,
  },
  server: {
    // host: "192.168.1.39",
    // port: 3000,
    watch: {
      ignored: serverIgnored,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, from.root),
      "@source": path.resolve(__dirname, from.source),
      "@components": path.resolve(__dirname, from.components),
      "@scripts": path.resolve(__dirname, from.scripts),
      "@styles": path.resolve(__dirname, from.styles),
    },
  },
  plugins: [
    // buildStart
    writePugMixinsFile({
      searchDir: from.components,
      outputFile: `${from.layouts}/mixins.pug`,
    }),
    writeServiceFiles(),
    viteStaticCopy({
      targets: getCopyTargets(),
    }),

    // transform
    vituum({
      imports: {
        filenamePattern: {
          "+.css": [],
          "+.scss": from.styles,
          "+.js": from.scripts,
        },
        paths: [`${from.styles}/*/**`, `${from.scripts}/*/**`],
      },
    }),
    vitePugLint(),
    pug({
      root: from.source,
      data: [`${from.data}/**/*.json`],
      globals: { ...builderConfig, ...projectConfig },
    }),
    vitePluginSvgSpriteMap(createSpriteIconsList(), svgSpriteOptions),

    // buildEnd
    hashGenerator(),
    beautify(prettyOption),

    // closeBundle
    replaceSvgHtml({
      dir: outputDir,
      replacements: {
        [svgAlias]: `${assetsDir}/img/${svgFileName}`,
      },
    }),
  ],
});
