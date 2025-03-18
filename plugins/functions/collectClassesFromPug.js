import { builderConfig } from "../../builder.config.js";

import fs from "node:fs";
import path from "node:path";

import { filterBlockClass } from "./filterBlockClasses.js";

const { from, classRegexp, templateRegexp } = builderConfig;

export function collectClassesFromPug(filePath) {
  const pugContent = fs.readFileSync(filePath, "utf-8");
  const classes = new Set();
  const fileName = path.parse(filePath).name;
  let layoutClasses = [];

  const isExtended = isExtendedFromLayout(pugContent);
  if (isExtended) {
    layoutClasses = collectClassesFromPug(`${from.layouts}/${isExtended}`);
  }

  let match;
  while ((match = classRegexp.exec(pugContent)) !== null) {
    const className = filterBlockClass(match[1], fileName);
    if (className) classes.add(className);
  }

  if (layoutClasses.length) {
    layoutClasses.forEach((layoutClass) => {
      classes.add(layoutClass);
    });
  }

  return Array.from(classes);
}

export function isExtendedFromLayout(content) {
  let path;

  let match;
  while ((match = templateRegexp.exec(content)) !== null) {
    if (match[0]) path = match[0];
  }

  return path;
}
