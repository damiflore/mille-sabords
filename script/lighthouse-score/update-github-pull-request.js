const { commentGithubPullRequest } = require("./commentGithubPullRequest.js")
const { generateLighthouseScoreMap } = require("./generateLighthouseScoreMap.js")

const run = async () => {
  const scoreMap = await generateLighthouseScoreMap()
  const commentBody = scoreMapToGithubPullRequestComment(scoreMap)

  await commentGithubPullRequest({
    issueNumber: 5,
    commentBody,
  })
}

const scoreMapToGithubPullRequestComment = (scoreMap) => {
  return `lighthouse score

Category | Score
-------- | -------
${Object.keys(scoreMap).map((category) => `${category} | ${scoreMap[category]}`).join(`
`)}`
}

run()
