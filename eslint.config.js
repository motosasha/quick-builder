import { defineConfig } from "eslint/config";
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    name: "eslint/recommended",
    files: ["src/**/*.js"],
    ignores: ["src/scripts/vendor/*.js", "**/*.config.js", "**/+.js", "!**/eslint.config.js"],
    extends: [pluginJs.configs.recommended, pluginPrettierRecommended],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    linterOptions: {
      noInlineConfig: false,
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
    },
    plugins: {},
    rules: {
      "no-undef": "warn",
      "no-unused-vars": "warn",
      "prettier/prettier": "warn",
    },
  },
]);
