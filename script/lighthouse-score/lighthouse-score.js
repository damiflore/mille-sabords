const getCurrentBranchName = require("current-git-branch")
const { commentGithubPullRequest } = require("./commentGithubPullRequest.js")
const { generateLighthouseScoreMap } = require("./generateLighthouseScoreMap.js")
const { listPullRequestForBranch } = require("./listPullRequestForBranch.js")

const fromEnv = (name) => {
  if (name in process.env) return process.env[name]
  // eslint-disable-next-line
  return require("../../env.json")[name]
}

const run = async () => {
  const githubToken = fromEnv("LIGHTHOUSE_GITHUB_TOKEN")
  const branchName = getCurrentBranchName()
  const pullRequestArray = await listPullRequestForBranch({
    token: githubToken,
    repoOwner: "damiflore",
    repoName: "mille-sabords",
    head: `damiflore:${branchName}`,
  })
  if (pullRequestArray.length === 0) return
  const pullRequestNumberArray = pullRequestArray.map((pullRequest) => {
    return pullRequest.number
  })
  const pullRequestNumber = pullRequestNumberArray[0]
  const scoreMap = await generateLighthouseScoreMap({
    url: `https://mille-sabords-pr-${pullRequestNumber}.herokuapp.com/`,
  })
  const commentBody = scoreMapToGithubPullRequestComment(scoreMap)

  await Promise.all(
    pullRequestNumberArray.map(async (pullRequestNumber) => {
      await commentGithubPullRequest({
        token: githubToken,
        repoOwner: "damiflore",
        repoName: "mille-sabords",
        issueNumber: pullRequestNumber,
        commentBody,
      })
    }),
  )
}

const scoreMapToGithubPullRequestComment = (scoreMap) => {
  return `lighthouse score

Category | Score
-------- | -------
${Object.keys(scoreMap).map((category) => `${category} | ${scoreMap[category]}`).join(`
`)}`
}

run()
