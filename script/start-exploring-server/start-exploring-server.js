const { startExploringServer } = require("@jsenv/exploring-server")
const { projectPath } = require("../../jsenv.config.js")

startExploringServer({
  projectPath,
  port: 3456,
  forcePort: true,
})
