const { executeTestPlan, launchChromiumTab, jsenvCoverageConfig } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")

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
  coverage: process.argv.includes("--coverage"),
  coverageConfig: {
    ...jsenvCoverageConfig,
    "./src/**/*.jsx": true,
  },
})
