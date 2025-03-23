import { defineConfig } from "eslint-define-config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import jestPlugin from "eslint-plugin-jest";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      jest: jestPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-unused-vars": "warn",
    },
  },
  {
    files: ["**/*.spec.{ts,js}", "**/*.test.{ts,js}"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
]);