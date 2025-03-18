import { projectConfig } from "../../project.config.js";

const { ignoredBlocks } = projectConfig;

export function filterBlockClass(className, fileName) {
  // add block names
  if (className.includes("+") || className.includes(".")) className = className.slice(1);
  // add classes in class attribute
  if (className.includes('class="') || className.includes("class='")) className = className.slice(7, -1);
  if (className.includes("class= ") || className.includes("class=")) return;
  // removing elements and modifiers
  if (className.indexOf("__") > -1 || className.indexOf("--") > -1) return;
  // remove js utility classes
  if (className.includes("js-")) return;
  // remove if it matches the exception class from the settings
  if (ignoredBlocks?.indexOf(className) + 1) return;
  // remove the use of the block itself
  if (fileName === className) return;

  return className;
}
