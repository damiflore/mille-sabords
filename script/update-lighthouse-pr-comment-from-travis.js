const {
  generateLighthouseReport,
  lighthousePullRequestCommentFromTravisBuild,
} = require("@dmail/lighthouse-report")
const { projectPath } = require("../jsenv.config.js")

lighthousePullRequestCommentFromTravisBuild({
  projectPath,
  getLighthouseProductionReport: () =>
    generateLighthouseReport({
      url: "https://mille-sabords.herokuapp.com/",
    }),
})
