import { reportSizeImpactIntoGithubPullRequest } from "@jsenv/github-pull-request-filesize-impact"
import { projectDirectoryUrl } from "../../../jsenv.config.js"

reportSizeImpactIntoGithubPullRequest({
  projectDirectoryUrl,
  baseSnapshotFileRelativeUrl: process.argv[2],
  headSnapshotFileRelativeUrl: process.argv[3],
})
