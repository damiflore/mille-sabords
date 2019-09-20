const { cover, jsenvCoverDescription } = require("@jsenv/testing")
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
    coverDescription: {
      ...jsenvCoverDescription,
      "/src/**/*.jsx": true,
    },
    coverageConsoleReport: true,
    coverageHtmlReport: true,
  })

  stop()
}
run()
