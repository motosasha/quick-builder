import { projectConfig } from "../project.config.js";

import fs from "node:fs/promises";
import path from "node:path";

const { svgFileName } = projectConfig;

export default function replaceHtmlPlugin(options) {
  const { dir, replacements } = options;
  let resolvedConfig;

  return {
    name: "vite-plugin-svg-replace",
    apply: "build",

    configResolved(config) {
      resolvedConfig = config;
    },

    async closeBundle() {
      const manifestPath = path.join(resolvedConfig.build.outDir, ".vite", "manifest.json");

      try {
        const svgSpriteFileName = `${svgFileName}.svg`;
        const manifest = JSON.parse(await fs.readFile(manifestPath, "utf-8"));
        const svgSpriteEntry = manifest[svgSpriteFileName];

        if (svgSpriteEntry && svgSpriteEntry.file) {
          const hashedFileName = svgSpriteEntry.file;
          const htmlFiles = (await fs.readdir(dir)).filter((file) => file.endsWith(".html"));

          htmlFiles.forEach((file) => {
            const filePath = path.join(dir, file);
            let htmlContent = fs.readFile(filePath, "utf-8");

            htmlContent.then((content) => {
              for (let [searchValue] of Object.entries(replacements)) {
                content = content.replace(new RegExp(searchValue, "g"), hashedFileName);
              }

              fs.writeFile(filePath, content, "utf-8");
            });
          });
        } else {
          console.warn(`[Manifest Read] Запись для ${svgSpriteEntry} не найдена в manifest.json.`);
        }
      } catch (error) {
        console.error("[SVG Replace] Ошибка при чтении manifest.json:", error);
      }
    },
  };
}
