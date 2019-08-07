const { launchChromiumToLaunchTab } = require("@jsenv/chromium-launcher")

const projectPath = __dirname
exports.projectPath = projectPath

const generateTestDescription = async () => {
  const { launchChromiumTab, stop } = await launchChromiumToLaunchTab({
    projectPath,
  })

  const testDescription = {
    "/test/**/*.test.js": {
      browser: {
        launch: launchChromiumTab,
      },
    },
  }

  return { testDescription, stop }
}
exports.generateTestDescription = generateTestDescription
