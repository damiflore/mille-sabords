const { cover } = require("@jsenv/testing")
const {
  projectPath,
  babelPluginMap,
  convertMap,
  generateTestDescription,
} = require("../../jsenv.config.js")

const run = async () => {
  const { testDescription, stop } = await generateTestDescription()

  await cover({
    projectPath,
    babelPluginMap,
    convertMap,
    executeDescription: testDescription,
    logCoverageTable: true,
    writeCoverageHtmlFolder: true,
  })

  stop()
}
run()
