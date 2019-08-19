const { commentGithubPullRequest } = require("./commentGithubPullRequest.js")
const { generateLighthouseScoreMap } = require("./generateLighthouseScoreMap.js")

const run = async () => {
  const herokuAppName = process.env.HEROKU_APP_NAME
  console.log("process.env.HEROKU_APP_NAME", herokuAppName)
  if (true) {
    throw new Error(herokuAppName)
  }

  const prIndex = herokuAppName.lastIndexOf("-pr-")
  // run this only for review app
  if (prIndex === -1) return

  const pullRequestNumber = Number(herokuAppName.slice(prIndex + `-pr-`.length))

  const scoreMap = await generateLighthouseScoreMap()
  const commentBody = scoreMapToGithubPullRequestComment(scoreMap)

  await commentGithubPullRequest({
    repoOwner: "damiflore",
    repoName: "mille-sabords",
    issueNumber: pullRequestNumber,
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
