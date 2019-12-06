const { jsenvBabelPluginMap, convertCommonJsWithRollup } = require("@jsenv/core")
const transformReactJSX = require("@babel/plugin-transform-react-jsx")

const projectDirectoryPath = __dirname
exports.projectDirectoryPath = projectDirectoryPath

const babelPluginMap = {
  ...jsenvBabelPluginMap,
  "transform-react-jsx": [
    transformReactJSX,
    { pragma: "React.createElement", pragmaFrag: "React.Fragment" },
  ],
}
exports.babelPluginMap = babelPluginMap

const convertMap = {
  "./node_modules/react/index.js": convertCommonJsWithRollup,
  "./node_modules/react-dom/index.js": async (options) => {
    return convertCommonJsWithRollup({ ...options, external: ["react"] })
  },
}
exports.convertMap = convertMap
