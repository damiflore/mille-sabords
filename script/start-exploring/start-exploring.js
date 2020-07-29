import { startExploring } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

startExploring({
  ...jsenvConfig,
  compileServerPort: 3472,
  explorableConfig: {
    "app": {
      "./index.dev.html": true,
      "./index.lab.html": true,
    },
    "manual tests": {
      "src/**/*.scenario.html": true,
    },
    "unit tests": {
      "src/**/*.test.html": true,
      "test/**/*.test.html": true,
    },
  },
})
