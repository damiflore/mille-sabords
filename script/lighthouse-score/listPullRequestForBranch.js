// https://developer.github.com/v3/pulls/#list-pull-requests
const fetch = require("node-fetch")

const listPullRequestForBranch = async ({ token, repoOwner, repoName, head }) => {
  try {
    const href = `https://api.github.com/repos/${repoOwner}/${repoName}/pulls?head=${encodeURIComponent(
      head,
    )}`
    const response = await fetch(href, {
      headers: {
        authorization: `token ${token}`,
      },
      method: "GET",
    })
    const status = response.status
    const responseBodyAsJSON = await response.json()

    if (status !== 200) {
      console.log({
        status,
        responseBodyAsJSON,
      })
    }
    return responseBodyAsJSON
  } catch (e) {
    throw e
  }
}

exports.listPullRequestForBranch = listPullRequestForBranch
