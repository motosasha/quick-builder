import { builderConfig } from "../builder.config.js";

import { isDeepEqual } from "./utils/deepEqualObjects.js";

import { getAllActualComponents } from "./functions/getAllActualComponents.js";
import { createImportsObject } from "./functions/createImportsObject.js";
import { createRequiresObject } from "./functions/createRequiresObject.js";
import { writeScssFile } from "./functions/writeScssImportsFile.js";
import { writeRequiresFile } from "./functions/writeJsRequiresFile.js";

const { from } = builderConfig;
const directoryPaths = [`${from.pages}`];
let importsObjectClone = null;
let requiresObjectClone = null;

export default function writeServiceFiles() {
  return {
    name: "vite-service-files",

    async buildStart() {
      const allFoundDirs = await getAllActualComponents(directoryPaths);
      const importsObject = createImportsObject(allFoundDirs);
      const requiresObject = createRequiresObject(allFoundDirs);
      importsObjectClone = JSON.parse(JSON.stringify(importsObject));
      requiresObjectClone = JSON.parse(JSON.stringify(requiresObject));

      writeScssFile(importsObject);
      writeRequiresFile(requiresObject);
    },
    async handleHotUpdate({ file }) {
      if (
        !file.endsWith("mixins.pug") &&
        !file.endsWith("style.scss") &&
        (file.endsWith(".pug") || file.endsWith(".css") || file.endsWith(".scss"))
      ) {
        const allFoundDirs = await getAllActualComponents(directoryPaths);
        const importsObject = createImportsObject(allFoundDirs);
        const requiresObject = createRequiresObject(allFoundDirs);
        const isStyleEqual = isDeepEqual(importsObjectClone, importsObject);
        const isScriptEqual = isDeepEqual(requiresObjectClone, requiresObject);

        if (!isStyleEqual) {
          importsObjectClone = JSON.parse(JSON.stringify(importsObject));

          writeScssFile(importsObject);
        }

        if (!isScriptEqual) {
          requiresObjectClone = JSON.parse(JSON.stringify(requiresObject));

          writeRequiresFile(requiresObject);
        }
      }
    },
  };
}
