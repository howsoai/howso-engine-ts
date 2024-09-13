import { createDefaultEsmPreset } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Other stuff like coverage options, etc.
  ...createDefaultEsmPreset({
    tsconfig: "tsconfig.base.json",
  }),
};
