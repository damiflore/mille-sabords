import {
  reportLighthouseScoreMergeImpact,
  readGithubWorkflowEnv,
} from "@jsenv/lighthouse-score-merge-impact"

reportLighthouseScoreMergeImpact({
  ...readGithubWorkflowEnv(),
  jsonFileGenerateCommand: "npm run generate-lighthouse-report",
})
