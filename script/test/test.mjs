import {
  executeTestPlan,
  launchChromiumTab,
  jsenvCoverageConfig,
} from "@jsenv/core"

import * as jsenvConfig from "../../jsenv.config.mjs"

executeTestPlan({
  ...jsenvConfig,
  testPlan: {
    "./src/**/*.test.html": {
      browser: {
        launch: launchChromiumTab,
        allocatedMs: 60 * 1000,
      },
    },
    "./test/**/*.test.html": {
      browser: {
        launch: launchChromiumTab,
        allocatedMs: 60 * 1000,
      },
    },
  },
  coverageConfig: {
    ...jsenvCoverageConfig,
    "./src/**/*.jsx": true,
  },
})
