const { test } = require("@jsenv/testing")
const {
  projectPath,
  babelPluginMap,
  convertMap,
  generateTestDescription,
} = require("../../jsenv.config.js")

const run = async () => {
  const { testDescription, stop } = await generateTestDescription()

  await test({
    projectPath,
    babelPluginMap,
    convertMap,
    executeDescription: testDescription,
  })

  stop()
}
run()
