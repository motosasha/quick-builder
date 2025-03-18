import fs from "node:fs";
import path from "node:path";

export function createRequiresObject(dirs) {
  const requiresObject = new Set();

  dirs.forEach((dir) => {
    const component = dir.split("/").slice(-2);
    dir = dir + `/${component[1]}.js`;

    if (fs.existsSync(path.resolve(dir))) {
      dir = dir.replace("src/components", "@components");
      requiresObject.add(dir);
    }
  });

  return requiresObject;
}
