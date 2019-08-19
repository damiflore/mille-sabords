// https://developer.github.com/v3/issues/comments/#create-a-comment
// https://developer.github.com/v3/issues/comments/#edit-a-comment
const fetch = require("node-fetch")

const fromEnv = (name) => {
  if (name in process.env) return process.env[name]
  return require("../../env.json")[name]
}

const commentGithubPullRequest = async ({ repoOwner, repoName, issueNumber, commentBody }) => {
  try {
    const body = JSON.stringify({ body: commentBody })

    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}/comments`,
      {
        headers: {
          authorization: `token ${fromEnv("LIGHTHOUSE_GITHUB_TOKEN")}`,
          "content-length": Buffer.byteLength(body),
        },
        method: "POST",
        body,
      },
    )
    const responseBodyAsJSON = await response.json()
    console.log({
      status: response.status,
      responseBodyAsJSON,
    })
  } catch (e) {
    throw e
  }
}
exports.commentGithubPullRequest = commentGithubPullRequest
