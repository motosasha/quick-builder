import { builderConfig } from "../../builder.config.js";
import { projectConfig } from "../../project.config.js";

import fs from "node:fs";
import path from "node:path";

const { from, filesRegexp } = builderConfig;
const { assetsDir } = projectConfig;

const desiredCwd = path.join(__dirname, "../../");
process.chdir(desiredCwd);

export function getCopyTargets() {
  const srcDir = from.components;
  const files = getFiles(srcDir, filesRegexp);

  return files.length > 0
    ? [
        {
          src: [`${from.components}/**/img/**/*.*`],
          dest: `${assetsDir}/img`,
        },
      ]
    : [];
}

function getFiles(dir, filePattern) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, filePattern));
    } else if (filePattern.test(filePath)) {
      results.push(filePath);
    }
  });

  return results;
}
