const { startExploringServer } = require("@jsenv/exploring-server")
const { projectPath, babelPluginMap, convertMap } = require("../../jsenv.config.js")

startExploringServer({
  projectPath,
  HTMLTemplateRelativePath: "/index.dev.html",
  babelPluginMap,
  convertMap,
  watchDescription: {
    "/**/*": false,
    "/index.js": true,
    "/src/**/*": true,
  },
  port: 3456,
  forcePort: true,
  livereloading: true,
})
