const { generateGlobalBundle } = require("@jsenv/bundling")
const { projectPath } = require("../../jsenv.config.js")

generateGlobalBundle({
  projectPath,
  globalName: "__mille_sabords__",
})
