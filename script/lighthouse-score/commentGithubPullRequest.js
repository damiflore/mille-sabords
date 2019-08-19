// https://developer.github.com/v3/issues/comments/#create-a-comment
// https://developer.github.com/v3/issues/comments/#edit-a-comment
const fetch = require("node-fetch")

const commentGithubPullRequest = async ({
  token,
  repoOwner,
  repoName,
  issueNumber,
  commentBody,
}) => {
  try {
    const body = JSON.stringify({ body: commentBody })

    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/issues/${issueNumber}/comments`,
      {
        headers: {
          authorization: `token ${token}`,
          "content-length": Buffer.byteLength(body),
        },
        method: "POST",
        body,
      },
    )
    const status = response.status

    if (status !== 201) {
      const responseBodyAsJSON = await response.json()

      console.log({
        status,
        responseBodyAsJSON,
      })
    }
  } catch (e) {
    throw e
  }
}
exports.commentGithubPullRequest = commentGithubPullRequest
