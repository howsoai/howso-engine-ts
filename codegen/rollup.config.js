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
          src: ["src/engine/howso.caml"],
          dest: "./codegen/build",
        },
        {
          src: ["./codegen/templates"],
          dest: "./codegen/build",
        },
      ],
    }),
  ],
  external: ["node:fs", "node:module", ...Object.keys(pkg.dependencies || {})],
  output: [
    {
      file: "codegen/build/index.cjs",
      format: "cjs",
    },
  ],
};
