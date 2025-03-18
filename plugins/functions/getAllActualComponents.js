import { builderConfig } from "../../builder.config.js";

import { analyzePugFiles } from "./analyzePugFiles.js";
import { findBlockDirectories } from "./findBlockDirectories.js";

const { from, isDebug } = builderConfig;

export function getAllActualComponents(directoryPaths) {
  const actualClasses = analyzePugFiles(directoryPaths);
  const actualDirectories = findBlockDirectories(from.components, Array.from(actualClasses));

  let previousLength;
  let updatedPaths = new Set([...actualDirectories]);
  let step = 0;

  do {
    previousLength = actualClasses.size;

    updatedPaths = findBlockDirectories(from.components, Array.from(actualClasses));

    const additionalClasses = analyzePugFiles(updatedPaths);
    for (const additionalClass of additionalClasses) {
      actualClasses.add(additionalClass);
    }
    if (isDebug) step += 1;
  } while (actualClasses.size !== previousLength);

  if (isDebug) console.log("Number of loop iterations:", step);

  return updatedPaths;
}
