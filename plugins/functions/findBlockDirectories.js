import { builderConfig } from "../../builder.config.js";
import { projectConfig } from "../../project.config.js";

import fs from "node:fs";
import path from "node:path";

const { from } = builderConfig;
const { alwaysAddBlocks } = projectConfig;

export function findBlockDirectories(dir, dirNames) {
  const items = fs.readdirSync(dir);
  let foundDirs = new Set();

  if (Object.keys(alwaysAddBlocks).length) {
    Object.keys(alwaysAddBlocks).forEach((level) => {
      alwaysAddBlocks[level].forEach((item) => {
        const fullPath = `${from.components}/${level}/${item}`;
        if (fs.existsSync(fullPath)) {
          foundDirs.add(fullPath);
        }
      });
    });
  }

  for (const item of items) {
    const fullPath = path.join(dir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      if (dirNames.includes(item)) {
        foundDirs.add(fullPath);
      }

      const subDirResults = findBlockDirectories(fullPath, dirNames);
      for (const subDirResult of subDirResults) {
        foundDirs.add(subDirResult);
      }
    }
  }

  foundDirs = new Set([...foundDirs].sort());

  return foundDirs;
}
