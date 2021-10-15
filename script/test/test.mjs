import {
  executeTestPlan,
  chromiumTabRuntime,
  jsenvCoverageConfig,
} from "@jsenv/core"

import * as jsenvConfig from "../../jsenv.config.mjs"

await executeTestPlan({
  ...jsenvConfig,
  testPlan: {
    "./src/**/*.test.html": {
      browser: {
        runtime: chromiumTabRuntime,
        allocatedMs: 60 * 1000,
      },
    },
    "./test/**/*.test.html": {
      browser: {
        runtime: chromiumTabRuntime,
        allocatedMs: 60 * 1000,
      },
    },
  },
  coverage: process.argv.includes("--coverage"),
  coverageJsonFileRelativeUrl: "coverage/coverage.json",
  coverageConfig: {
    ...jsenvCoverageConfig,
    "./src/**/*.jsx": true,
  },
})
