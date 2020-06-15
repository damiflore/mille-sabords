import { startExploring } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

startExploring({
  ...jsenvConfig,
  htmlFileRelativeUrl: "./index.dev.html",
  port: 3472,
  explorableConfig: {
    "app": {
      "./index.js": true,
      "./lab/lab.index.js": true,
    },
    "source files": {
      "./src/**/*.js": true,
      "./test-manual/**/*.js": true,
      "**/*.test.js": false,
      "node_modules/": false,
    },
    "unit tests": {
      "**/*.test.js": true,
      "node_modules/": false,
    },
  },
})
