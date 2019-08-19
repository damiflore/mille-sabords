// https://developer.github.com/v3/issues/comments/#create-a-comment
// https://developer.github.com/v3/issues/comments/#edit-a-comment
const fetch = require("node-fetch")

const commentGithubPullRequest = async ({ issueNumber, commentBody }) => {
  try {
    const body = JSON.stringify({ body: commentBody })

    const response = await fetch(
      `https://api.github.com/repos/damiflore/mille-sabords/issues/${issueNumber}/comments`,
      {
        headers: {
          authorization: `token 12a1eb1595ccc970abc9bace3c83f96ef40420cd`,
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
