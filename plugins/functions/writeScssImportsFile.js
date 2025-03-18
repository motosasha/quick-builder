import { builderConfig } from "../../builder.config.js";
import { projectConfig } from "../../project.config.js";

import fs from "node:fs";

const { from, doNotEditMsg, isDebug } = builderConfig;
const { style, styleLayers } = projectConfig;
const outputFile = `${from.styles}/style.scss`;
const importsMessage = `/* !*${doNotEditMsg.replace(/\n /gm, "\n * ").replace(/\n\n$/, "\n */\n")}`;

export function writeScssFile(list) {
  let styleImports = `${importsMessage}
@use "sass:meta";\n
@layer ${styleLayers.join(", ")};\n\n`;

  styleLayers.forEach((layer) => {
    if (style[layer]) {
      styleImports += `@layer ${layer} {\n`;
      style[layer].forEach((element) => {
        styleImports += `  @include meta.load-css("${element}");\n`;
      });
      styleImports += `}\n\n`;
    } else {
      if (list[layer]) {
        styleImports += `@layer ${layer} {\n`;
        list[layer].forEach((element) => {
          styleImports += `  @include meta.load-css("${element}");\n`;
        });
        styleImports += `}\n`;
      }
    }
  });

  styleImports += `\n${importsMessage}`;

  fs.writeFileSync(outputFile, styleImports);
  if (isDebug) console.log(`SCSS-imports is written to the path: ${outputFile}`);
}
