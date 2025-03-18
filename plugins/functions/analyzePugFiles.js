import fs from "node:fs";
import path from "node:path";

import { collectClassesFromPug } from "./collectClassesFromPug.js";

const desiredCwd = path.join(__dirname, "../../");
process.chdir(desiredCwd);

export function analyzePugFiles(directories) {
  const pugFilesClasses = new Set();

  directories.forEach((dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        const classesFromDir = analyzePugFiles([filePath]);
        classesFromDir.forEach((className) => pugFilesClasses.add(className));
      } else if (file.endsWith(".pug")) {
        const classesFromPage = collectClassesFromPug(filePath);

        classesFromPage.forEach((className) => pugFilesClasses.add(className));
      }
    });
  });

  return pugFilesClasses;
}
