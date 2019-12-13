const { pathToFileURL } = require("url")
const { jsenvBabelPluginMap, convertCommonJsWithRollup } = require("@jsenv/core")
const transformReactJSX = require("@babel/plugin-transform-react-jsx")

exports.projectDirectoryUrl = `${String(pathToFileURL(__dirname))}/`

exports.babelPluginMap = {
  ...jsenvBabelPluginMap,
  "transform-react-jsx": [
    transformReactJSX,
    { pragma: "React.createElement", pragmaFrag: "React.Fragment" },
  ],
}

exports.convertMap = {
  "./node_modules/react/index.js": convertCommonJsWithRollup,
  "./node_modules/react-dom/index.js": async (options) => {
    return convertCommonJsWithRollup({ ...options, external: ["react"] })
  },
}
