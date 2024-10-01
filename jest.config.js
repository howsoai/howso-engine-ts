/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^d3-dsv$": "<rootDir>/node_modules/d3-dsv/dist/d3-dsv.min.js",
  },
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  transform: {
    "^.+\\.[tj]s$": [
      "ts-jest",
      {
        // Allow importing from /webassembly/
        tsconfig: {
          allowJs: true,
        },
      },
    ],
  },
};
