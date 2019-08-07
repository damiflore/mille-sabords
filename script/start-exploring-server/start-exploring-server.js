const { startExploringServer } = require("@jsenv/exploring-server")
const { projectPath, babelPluginMap } = require("../../jsenv.config.js")

startExploringServer({
  projectPath,
  babelPluginMap,
  watchDescription: {
    "/**/*": false,
    "/index.js": true,
    "/src/**/*": true,
  },
  port: 3456,
  forcePort: true,
  livereloading: true,
})
