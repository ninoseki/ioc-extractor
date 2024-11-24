// @ts-check
import eslint from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import * as regexpPlugin from "eslint-plugin-regexp";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

// eslint-disable-next-line no-undef
const mode = process.env.NODE_ENV === "production" ? "error" : "warn";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  regexpPlugin.configs["flat/recommended"],
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": mode,
      "simple-import-sort/exports": mode,
      "no-console": mode,
      "no-debugger": mode,
    },
  },
  {
    files: ["spec/**"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
);
