import { commonJsToJavaScriptModule } from "@jsenv/core"

export const projectDirectoryUrl = String(new URL("./", import.meta.url))

export const runtimeSupport = {
  chrome: "80",
  edge: "17",
  firefox: "80",
  safari: "17",
}

export const customCompilers = {
  "./node_modules/react/index.js": commonJsToJavaScriptModule,
  "./node_modules/react-dom/index.js": async (options) => {
    return commonJsToJavaScriptModule({ ...options, external: ["react"] })
  },
}
