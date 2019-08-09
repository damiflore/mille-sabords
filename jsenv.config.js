const { launchChromiumToLaunchTab } = require("@jsenv/chromium-launcher")
const { jsenvBabelPluginMap } = require("@jsenv/babel-plugin-map")
const transformReactJSX = require("@babel/plugin-transform-react-jsx")
const { convertCommonJsWithRollup } = require("@jsenv/core")

const projectPath = __dirname
exports.projectPath = projectPath

const babelPluginMap = {
  ...jsenvBabelPluginMap,
  "transform-react-jsx": [transformReactJSX, { pragma: "React.createElement" }],
}
exports.babelPluginMap = babelPluginMap

const convertMap = {
  "/node_modules/react/index.js": convertCommonJsWithRollup,
  "/node_modules/react-dom/index.js": convertCommonJsWithRollup,
}
exports.convertMap = convertMap

const generateTestDescription = async () => {
  const { launchChromiumTab, stop } = await launchChromiumToLaunchTab({
    projectPath,
    HTMLTemplateRelativePath: "/index.dev.html",
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
