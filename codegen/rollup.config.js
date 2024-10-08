import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import pkg from "../package.json" with { type: "json" };

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: "codegen/main.ts",
  plugins: [
    typescript({
      noEmitOnError: true,
      tsconfig: "./codegen/tsconfig.json",
    }),
    copy({
      targets: [
        {
          src: ["src/assets/howso.caml"],
          dest: "./codegen/build",
        },
        {
          src: ["./codegen/templates"],
          dest: "./codegen/build",
        },
      ],
    }),
  ],
  external: [
    "node:fs",
    "node:module",
    "node:path",
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ],
  output: [
    {
      file: "codegen/build/index.cjs",
      format: "cjs",
    },
  ],
};
