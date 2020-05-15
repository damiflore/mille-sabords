import { executeTestPlan, launchChromiumTab, jsenvCoverageConfig } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

executeTestPlan({
  ...jsenvConfig,
  testPlan: {
    "./src/**/*.test.js": {
      browser: {
        launch: launchChromiumTab,
      },
    },
    "./test/**/*.test.js": {
      browser: {
        launch: launchChromiumTab,
      },
    },
  },
  coverageConfig: {
    ...jsenvCoverageConfig,
    "./src/**/*.jsx": true,
  },
})
