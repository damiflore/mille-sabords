const { test } = require("@jsenv/testing")
const { projectPath, generateTestDescription } = require("../../jsenv.config.js")

const run = async () => {
  const { testDescription, stop } = await generateTestDescription()

  await test({
    projectPath,
    executeDescription: testDescription,
  })

  stop()
}
run()
