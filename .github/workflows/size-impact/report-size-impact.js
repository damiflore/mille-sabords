import {
  reportFileSizeImpact,
  readGithubWorkflowEnv,
  none,
  gzip,
  brotli,
} from "@jsenv/file-size-impact"

reportFileSizeImpact({
  ...readGithubWorkflowEnv(),
  buildCommand: "npm run dist",
  trackingConfig: {
    "dist/systemjs": {
      "./dist/systemjs/**/*": true,
      "./dist/systemjs/**/*.map": false,
    },
  },
  transformations: { none, gzip, brotli },
})
