const { generateGlobalBundle } = require("@jsenv/bundling")
const { projectPath, babelPluginMap } = require("../../jsenv.config.js")

generateGlobalBundle({
  projectPath,
  babelPluginMap,
  globalName: "__mille_sabords__",
})
