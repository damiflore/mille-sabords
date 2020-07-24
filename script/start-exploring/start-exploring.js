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
    "unit tests": {
      "**/*.test.html": true,
      "node_modules/": false,
    },
  },
})
