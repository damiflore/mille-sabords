const { generateGlobalBundle } = require("@jsenv/bundling")
const { projectPath, babelPluginMap, convertMap } = require("../../jsenv.config.js")

// this is to get the production build of react
process.env.NODE_ENV = "production"

generateGlobalBundle({
  projectPath,
  babelPluginMap,
  convertMap,
  globalName: "__mille_sabords__",
  minify: true,
})
