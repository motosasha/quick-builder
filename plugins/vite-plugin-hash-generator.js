import { builderConfig } from "../builder.config.js";

import fs from "node:fs";
import path from "node:path";

const { from } = builderConfig;

export default function hashPlugin() {
  return {
    name: "vite-plugin-hash",

    generateBundle(options, bundle) {
      const hashes = {};

      for (const fileName in bundle) {
        const file = bundle[fileName];
        const hashMatch = file.fileName.match(/\.([A-Za-z0-9]{8})\./);
        if (hashMatch && (file.type === "asset" || file.type === "chunk")) {
          hashes[file.name] = hashMatch[1];
        }
      }

      fs.writeFileSync(path.resolve(`${from.service}/hashes.json`), JSON.stringify(hashes, null, 2));
    },
  };
}
