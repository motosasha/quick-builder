import fs from "node:fs";
import path from "node:path";

export function createImportsObject(dirs) {
  const importsObject = {};

  dirs.forEach((dir) => {
    if (fs.existsSync(path.resolve(dir))) {
      const component = dir.split("/").slice(-2);
      dir = (dir + `/${component[1]}`).replace("src/components", "@components");

      if (importsObject[component[0]]) {
        importsObject[component[0]].push(dir);
      } else {
        importsObject[component[0]] = [];
        importsObject[component[0]].push(dir);
      }
    }
  });

  return importsObject;
}
