import path from "node:path";
import { execSync } from "node:child_process";

export default function vitePugLint() {
  return {
    name: "vite-pug-lint",

    buildStart() {
      try {
        execSync("bun run lint:pug", { stdio: "inherit" });
      } catch (e) {}
    },
    handleHotUpdate({ file }) {
      if (file.endsWith(".pug") && !file.endsWith("mixins.pug")) {
        try {
          execSync(`bun run lint:pug -- ${path.relative(process.cwd(), file)}`, { stdio: "inherit" });
        } catch (e) {}
      }
    },
  };
}
