import {
  reportLighthouseScoreMergeImpact,
  readGithubWorkflowEnv,
} from "@jsenv/lighthouse-score-merge-impact"

reportLighthouseScoreMergeImpact({
  ...readGithubWorkflowEnv(),
  generateCommand: "npm run generate-lighthouse-report",
})
