const {
  generateLighthouseReport,
  commentPullRequestWithLighthouseReport,
} = require("@dmail/lighthouse-report")
const { projectPath } = require("../../jsenv.config.js")

const run = async () => {
  const productionLightouseReport = await generateLighthouseReport({
    url: "https://mille-sabords.herokuapp.com/",
  })
  await commentPullRequestWithLighthouseReport({
    projectPath,
    productionLightouseReport,
  })
}
run()
