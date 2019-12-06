const { pathToFileURL } = require("url")
const { startExploring } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

startExploring({
  ...jsenvConfig,
  htmlFileUrl: String(new URL("./index.dev.html", pathToFileURL(jsenvConfig.projectDirectoryPath))),
  watchDescription: {
    "./**/*": false,
    "./*": true,
    "./src/**/*": true,
  },
  port: 3456,
  forcePort: true,
  livereloading: true,
})
