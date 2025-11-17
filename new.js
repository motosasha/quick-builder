// Block files generator
// Use: node new[.js] block-layer block-name [pug js md img symbols (add. space-separated expansions, ex: scss)]

import { builderConfig } from "./builder.config.js";

import { existsSync, mkdirSync, writeFile } from "node:fs";
import path from "node:path";

const { from } = builderConfig;

const layer = process.argv[2];
const blockName = process.argv[3];
const defaultExtensions = ["scss"];
const extensions = [...defaultExtensions, ...new Set(process.argv.slice(4))];

if (blockName) {
  const levelPath = `${from.components}/${layer}/`;
  const blockPath = `${levelPath}${blockName}/`;

  if (!existsSync(blockPath)) {
    try {
      if (!existsSync(levelPath)) {
        mkdirSync(levelPath);
      }
      mkdirSync(blockPath);
      console.log(`[MSG] Папка создана: ${blockPath}`);
    } catch (e) {
      console.error("Не удалось создать директорию:", e);
    }
  } else {
    console.log(`[MSG] Папка НЕ создана: ${blockPath} (уже существует) `);
  }

  extensions.forEach((extension) => {
    const filePath = `${blockPath + blockName}.${extension}`;
    let fileContent = "";
    let fileCreateMsg = "";

    if (extension === "scss") {
      fileContent = `@use "@styles/base/breakpoints";
@use "@styles/mixins/typography";

.${blockName} {
  $block-name: &; // #{$block-name}__element
}
`;
    } else if (extension === "js") {
      fileContent = `import { ready } from "@scripts/utils/documentReady.js";

ready(function () {
  console.log("${blockName} script is working");
});
`;
    } else if (extension === "md") {
      fileContent = "";
    } else if (extension === "pug") {
      fileContent = `//- Все примеси в этом файле должны начинаться c имени блока (${blockName})
//- Упоминание имени блока в классах обязательно, без этого он не попадёт
//- в сборку

mixin ${blockName}(mods, data)

  //- Принимает:
  //-   mods    {string} - список модификаторов
  //-   data    {object} - объект с данными
  //- Вызов:
        +${blockName}("some-mod", {})

  //- список модификаторов
  -
    var allMods = "";
    if (typeof (mods) !== "undefined" && mods) {
      var modsList = mods.split(",");
      for (var i = 0; i < modsList.length; i++) {
        allMods = allMods + " ${blockName}--" + modsList[i].trim();
      }
    }

  .${blockName}(class=allMods)&attributes(attributes)
    .${blockName}__inner
      block
`;
    } else if (extension === "img" || extension === "symbols") {
      const folder = `${blockPath}${extension}/`;
      if (existsSync(folder) === false) {
        mkdirSync(folder);
        console.log(`[MSG] Папка создана: ${folder}`);
      } else {
        console.log(`[MSG] Папка НЕ создана: ${folder} (уже существует) `);
      }
    }

    if (existsSync(path.resolve(filePath)) === false && extension !== "img" && extension !== "symbols") {
      writeFile(filePath, fileContent, (err) => {
        if (err) {
          return console.log(`[MSG] Файл НЕ создан: ${err}`);
        }
        console.log(`[MSG] Файл создан: ${filePath}`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    } else if (extension !== "img" && extension !== "symbols") {
      console.log(`[MSG] Файл НЕ создан: ${filePath} (уже существует)`);
    } else if (extension === "md") {
      writeFile(`${blockPath}readme.md`, fileContent, (err) => {
        if (err) {
          return console.log(`[MSG] Файл НЕ создан: ${err}`);
        }
        console.log(`[MSG] Файл создан: ${blockPath}readme.md`);
        if (fileCreateMsg) {
          console.warn(fileCreateMsg);
        }
      });
    }
  });
} else {
  console.log("[MSG] Отмена операции: не указан блок");
}
