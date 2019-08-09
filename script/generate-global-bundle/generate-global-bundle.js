const { generateGlobalBundle } = require("@jsenv/bundling")
const { projectPath, babelPluginMap, convertMap } = require("../../jsenv.config.js")

// TODO: change this for system format
// so that we can use dynamic import and benefit
// from code splitting

// this is to get the production build of react
process.env.NODE_ENV = "production"

generateGlobalBundle({
  projectPath,
  babelPluginMap,
  convertMap,
  globalName: "__mille_sabords__",
  minify: true,
})
