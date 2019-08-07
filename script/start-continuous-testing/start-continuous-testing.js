const { startContinuousTesting } = require("@jsenv/testing")
const { projectPath, generateTestDescription } = require("../../jsenv.config.js")

const run = async () => {
  const { testDescription, stop } = await generateTestDescription()

  await startContinuousTesting({
    projectPath,
    executeDescription: testDescription,
  })

  stop()
}
run()
