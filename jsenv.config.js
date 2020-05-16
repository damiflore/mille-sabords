import { createRequire } from "module"
import { jsenvBabelPluginMap, convertCommonJsWithRollup } from "@jsenv/core"

const require = createRequire(import.meta.url)

const transformReactJSX = require("@babel/plugin-transform-react-jsx")

export const projectDirectoryUrl = String(new URL("./", import.meta.url))

export const babelPluginMap = {
  ...jsenvBabelPluginMap,
  "transform-react-jsx": [
    transformReactJSX,
    { pragma: "React.createElement", pragmaFrag: "React.Fragment" },
  ],
}

export const convertMap = {
  "./node_modules/react/index.js": convertCommonJsWithRollup,
  "./node_modules/react-dom/index.js": async (options) => {
    return convertCommonJsWithRollup({ ...options, external: ["react"] })
  },
}
