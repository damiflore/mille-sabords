import {
  reportLighthouseScoreMergeImpact,
  readGithubWorkflowEnv,
} from "@jsenv/lighthouse-score-merge-impact"

reportLighthouseScoreMergeImpact({
  ...readGithubWorkflowEnv(),
  logLevel: "warn",
  generateCommand: "npm run generate-lighthouse-report",
})