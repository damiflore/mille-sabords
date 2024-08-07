import { executeTestPlan, chromium } from "@jsenv/test"

await executeTestPlan({
  rootDirectoryUrl: new URL("../", import.meta.url),
  testPlan: {
    "./src/**/*.test.html": {
      chromium: {
        runtime: chromium(),
        allocatedMs: 60_000,
      },
    },
  },
  webServer: {
    origin: "https://localhost:3472",
    moduleUrl: new URL("./dev.mjs", import.meta.url),
  },
  coverage: process.argv.includes("--coverage") ? {} : null,
})
