import {
  reportLighthouseScoreMergeImpact,
  readGithubWorkflowEnv,
} from "@jsenv/lighthouse-score-merge-impact"

reportLighthouseScoreMergeImpact({
  ...readGithubWorkflowEnv(),
  logLevel: "debug",
  generateCommand: "npm run generate-lighthouse-report",
})
