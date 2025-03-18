import { projectConfig } from "../project.config.js";

import fs from "node:fs";
import path from "node:path";

import hashes from "../src/service/hashes.json";

const { svgFileName } = projectConfig;

export default function replaceHtmlPlugin(options) {
  const { dir, replacements } = options;

  return {
    name: "vite-plugin-svg-replace",
    apply: "build",

    closeBundle() {
      const htmlFiles = fs.readdirSync(dir).filter((file) => file.endsWith(".html"));

      htmlFiles.forEach((file) => {
        const filePath = path.join(dir, file);
        let htmlContent = fs.readFileSync(filePath, "utf-8");

        for (let [searchValue, replaceValue] of Object.entries(replacements)) {
          replaceValue += `.${hashes[`${svgFileName}.svg`]}.svg`;
          htmlContent = htmlContent.replace(new RegExp(searchValue, "g"), replaceValue.toString());
        }

        fs.writeFileSync(filePath, htmlContent, "utf-8");
      });
    },
  };
}
