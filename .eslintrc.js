const { createEslintConfig } = require("@jsenv/eslint-config")
const jsenvConfig = require("./jsenv.config.js")

const config = createEslintConfig({
  ...jsenvConfig,
  importResolutionMethod: "import-map",
  react: true,
  jsx: true,
})

module.exports = config
