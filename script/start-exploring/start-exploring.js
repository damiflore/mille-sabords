import { startExploring } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

startExploring({
  ...jsenvConfig,
  compileServerPort: 3472,
  explorableConfig: {
    "app": {
      "./index.dev.html": true,
      "./lab/lab.index.html": true,
    },
    "source files": {
      "./src/**/*.html": true,
      "./test-manual/**/*.html": true,
      "**/*.test.html": false,
      "node_modules/": false,
    },
    "unit tests": {
      "**/*.test.html": true,
      "node_modules/": false,
    },
    "manual testing": {
      "**/*.scenario.html": true,
      "node_modules/": false,
    },
  },
})
