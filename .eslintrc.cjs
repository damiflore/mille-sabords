const { createEslintConfig } = require("@jsenv/eslint-config")

const config = createEslintConfig({
  projectDirectoryUrl: __dirname,
  importResolutionMethod: "import-map",
  importMapFileRelativeUrl: "./importmap.dev.importmap",
  react: true,
  jsx: true,
})

module.exports = config
