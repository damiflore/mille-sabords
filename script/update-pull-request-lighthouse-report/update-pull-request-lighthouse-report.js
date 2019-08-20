const { commentPullRequestWithLighthouseReport } = require("@dmail/lighthouse-report")
const { projectPath } = require("../../jsenv.config.js")

commentPullRequestWithLighthouseReport({
  projectPath,
  compareWithProductionAt: "https://mille-sabords.herokuapp.com/",
})
