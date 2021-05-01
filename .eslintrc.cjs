const { createEslintConfig } = require("@jsenv/eslint-config")

const eslintConfig = createEslintConfig({
  projectDirectoryUrl: __dirname,
  importResolutionMethod: "import-map",
  importMapFileRelativeUrl: "./importmap.dev.importmap",
  browser: true,
  html: true,
  prettier: true,
  react: true,
  jsx: true,
})

const importResolverPath = require.resolve("@jsenv/importmap-eslint-resolver")
// consider some files inside as written for Node.js
eslintConfig.overrides.push({
  files: [".github/**/*.js", "script/**/*.js", "jsenv.config.js"],
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  settings: {
    "import/resolver": {
      [importResolverPath]: {
        node: true,
      },
    },
  },
})

// any file ending with .cjs as written for Node.js with commonjs module resolution
eslintConfig.overrides.push({
  files: ["**/*.cjs"],
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  settings: {
    "import/resolver": {
      [importResolverPath]: {
        node: true,
        commonJsModuleResolution: true,
      },
    },
  },
})

module.exports = eslintConfig
