const { startContinuousTesting } = require("@jsenv/testing")
const {
  projectPath,
  babelPluginMap,
  convertMap,
  generateTestDescription,
} = require("../../jsenv.config.js")

const run = async () => {
  const { testDescription, stop } = await generateTestDescription()

  await startContinuousTesting({
    projectPath,
    babelPluginMap,
    convertMap,
    executeDescription: testDescription,
  })

  stop()
}
run()
