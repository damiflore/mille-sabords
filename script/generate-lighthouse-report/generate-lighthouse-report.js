const { generateLighthouseReport } = require("@dmail/lighthouse-report")
const { projectPath } = require("../../jsenv.config.js")

const run = async () => {
  const { bundlePromise } = require("../generate-global-bundle/generate-global-bundle.js")
  await bundlePromise
  const { serverPromise } = require("../start/start.js")
  const server = await serverPromise

  await generateLighthouseReport({
    url: server.origin,
    projectPath,
    // chromeFlags: ["--headless", "--disable-gpu", "--no-sandbox"],
  })

  server.close("lighthouse report generated")
}
run()
