const {
  generateLighthouseReport,
  commentPullRequestWithLighthouseReport,
} = require("@dmail/lighthouse-report")
const { projectPath } = require("../../jsenv.config.js")

const run = async () => {
  const productionReport = await generateLighthouseReport({
    url: "https://mille-sabords.herokuapp.com/",
    // chromeFlags: ["--headless", "--disable-gpu", "--no-sandbox"],
  })
  await commentPullRequestWithLighthouseReport({
    projectPath,
    productionReport,
  })
}
run()
