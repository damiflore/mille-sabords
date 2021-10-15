/*
 * This file exports configuration reused by jsenv scripts such as
 *
 * script/test/test.mjs
 * script/build/build.mjs
 *
 * Read more at https://github.com/jsenv/jsenv-core#jsenvconfigmjs
 */

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
