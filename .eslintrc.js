const { createConfig } = require("@jsenv/eslint-config")

const config = createConfig({
  projectPath: __dirname,
  jsxEnabled: true,
  reactPluginEnabled: true,
})

module.exports = config
