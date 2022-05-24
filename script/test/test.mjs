import { executeTestPlan, chromium, defaultCoverageConfig } from "@jsenv/core"

import { rootDirectoryUrl, plugins } from "../../jsenv.config.mjs"

await executeTestPlan({
  rootDirectoryUrl,
  plugins,
  testPlan: {
    "./src/**/*.test.html": {
      browser: {
        runtime: chromium,
        allocatedMs: 60 * 1000,
      },
    },
    "./test/**/*.test.html": {
      browser: {
        runtime: chromium,
        allocatedMs: 60 * 1000,
      },
    },
  },
  coverage: process.argv.includes("--coverage"),
  coverageJsonFileRelativeUrl: "coverage/coverage.json",
  coverageConfig: {
    ...defaultCoverageConfig,
    "./src/**/*.jsx": true,
  },
})
