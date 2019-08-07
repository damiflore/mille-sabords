const { cover } = require("@jsenv/testing")
const { projectPath, generateTestDescription } = require("../../jsenv.config.js")

const run = async () => {
  const { testDescription, stop } = await generateTestDescription()

  await cover({
    projectPath,
    executeDescription: testDescription,
    logCoverageTable: true,
    writeCoverageHtmlFolder: true,
  })

  stop()
}
run()
