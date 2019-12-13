const { startExploring } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

startExploring({
  ...jsenvConfig,
  htmlFileRelativeUrl: "./index.dev.html",
  watchConfig: {
    "./**/*": false,
    "./*": true,
    "./src/**/*": true,
  },
  port: 3456,
  forcePort: true,
  livereloading: true,
})
