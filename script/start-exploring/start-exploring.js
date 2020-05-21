import { startExploring } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

startExploring({
  ...jsenvConfig,
  htmlFileRelativeUrl: "./index.dev.html",
  port: 3472,
  explorableConfig: {
    "./index.js": true,
    "./src/**/*.js": true,
    "./test/**/*.js": true,
    "./test-manual/**/*.js": true,
  },
})
