import {
  reportFileSizeImpact,
  readGithubWorkflowEnv,
  raw,
  gzip,
  brotli,
} from "@jsenv/file-size-impact"

reportFileSizeImpact({
  ...readGithubWorkflowEnv(),
  buildCommand: "npm run dist",
  trackingConfig: {
    systemjs: {
      "./index.prod.html": true,
      "./dist/bundle.importmap": true,
      "./dist/systemjs/**/*": true,
      "./dist/systemjs/**/*.map": false,
    },
  },
  transformations: { raw, gzip, brotli },
})
