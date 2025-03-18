import { builderConfig } from "../builder.config.js";

import fs from "node:fs";
import fsPromise from "node:fs/promises";
import path from "node:path";

import { isDeepEqual } from "./utils/deepEqualObjects.js";

const { from, isDebug } = builderConfig;
let mixinObject = null;

export default function writePugMixinsFile(options = {}) {
  const { outputFile = `${from.layouts}/mixins.pug`, searchDir = process.cwd() } = options;

  return {
    name: "vite-plugin-mixins-pug",

    async buildStart() {
      const pugFiles = await findFilesWithExtension(searchDir, ".pug");
      mixinObject = [...pugFiles];

      await writeFile(pugFiles, outputFile).then(() => {
        if (isDebug) console.log(`pug-mixins object:`, pugFiles);
        if (isDebug) console.log(`pug-mixins file path: ${outputFile}`);
      });
    },
    async handleHotUpdate({ file }) {
      const filePath = path.relative(process.cwd(), file);
      const pugFiles = await findFilesWithExtension(searchDir, ".pug");

      if (filePath.startsWith(searchDir)) {
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error(`Ошибка при получении информации о файле: ${err}`);
            return;
          }

          if (stats.isFile()) {
            const isEqual = isDeepEqual(mixinObject, pugFiles);

            if (!isEqual) {
              writeFile(pugFiles, outputFile).then(() => {
                mixinObject = [...pugFiles];
                if (isDebug) console.log(`pug-mixins object:`, pugFiles);
              });
            }
          }
        });
      }
    },
  };
}

async function writeFile(files, outputFile) {
  let pugMixins = "//-" + builderConfig.doNotEditMsg;

  files.forEach(function (blockUrl) {
    pugMixins += `include ${blockUrl.replace(from.source, "..")}\n`;
  });

  fs.writeFileSync(outputFile, pugMixins);
}

async function findFilesWithExtension(dir, extension) {
  let results = [];

  try {
    const entries = await fsPromise.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        const subDirResults = await findFilesWithExtension(fullPath, extension);
        results = results.concat(subDirResults);
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        results.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Ошибка при чтении директории ${dir}:`, error);
  }

  return results;
}
