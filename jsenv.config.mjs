import { createRequire } from "node:module"
import { jsenvBabelPluginMap, commonJsToJavaScriptModule } from "@jsenv/core"

const require = createRequire(import.meta.url)

const transformReactJSX = require("@babel/plugin-transform-react-jsx")

export const projectDirectoryUrl = String(new URL("./", import.meta.url))

export const runtimeSupport = {
  chrome: "80",
  edge: "17",
  firefox: "80",
  safari: "17",
}

export const babelPluginMap = {
  ...jsenvBabelPluginMap,
  "transform-react-jsx": [
    transformReactJSX,
    { pragma: "React.createElement", pragmaFrag: "React.Fragment" },
  ],
}

export const customCompilers = {
  "./node_modules/react/index.js": commonJsToJavaScriptModule,
  "./node_modules/react-dom/index.js": async (options) => {
    return commonJsToJavaScriptModule({ ...options, external: ["react"] })
  },
}
