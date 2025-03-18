import { builderConfig } from "../../builder.config.js";

import fs from "node:fs";
import path from "node:path";

import { getAllActualComponents } from "./getAllActualComponents.js";

const { from } = builderConfig;
const directoryPaths = [`${from.pages}`];

export function createSpriteIconsList() {
  const allFoundDirs = getAllActualComponents(directoryPaths);
  const list = [`${from.icons}/**/*.svg`];

  allFoundDirs.forEach((dir) => {
    const symbolsPath = path.join(dir, "symbols");

    if (fs.existsSync(symbolsPath) && fs.lstatSync(symbolsPath).isDirectory()) {
      list.push(`${symbolsPath}/**/*.svg`);
    }
  });

  return list;
}
