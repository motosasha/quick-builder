import { builderConfig } from "../../builder.config.js";
import { projectConfig } from "../../project.config.js";

import fs from "node:fs";

const { from, doNotEditMsg, isDebug } = builderConfig;
const { addScripts } = projectConfig;
const outputFile = `${from.scripts}/entry.js`;
const requiresMessage = `/*!*${doNotEditMsg.replace(/\n /gm, "\n *").replace(/\n\n$/, "\n */\n")}`;

export function writeRequiresFile(list) {
  let requiresImports = `${requiresMessage}\n`;

  if (addScripts) {
    addScripts.forEach((element) => {
      element.isActive ? (requiresImports += `import "${element.path}";\n`) : null;
    });
  }

  list.forEach((script) => {
    requiresImports += `import "${script}";\n`;
  });

  requiresImports += `\n${requiresMessage}`;

  fs.writeFileSync(outputFile, requiresImports);
  if (isDebug) console.log(`JS-imports is written to the path: ${outputFile}`);
}
