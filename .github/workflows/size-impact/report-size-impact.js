import { reportFileSizeImpact, readGithubWorkflowEnv, raw, gzip } from "@jsenv/file-size-impact"

reportFileSizeImpact({
  ...readGithubWorkflowEnv(),
  buildCommand: "npm run dist",
  trackingConfig: {
    systemjs: {
      "./dist/systemjs/**/*": true,
      "./dist/systemjs/**/*.map": false,
    },
  },
  transformations: { raw, gzip },
})
