/*
 * This file uses "@jsenv/core" to convert source files into systemjs format
 * and write them into "./dist/" directory.
 *
 * Read more at https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#jsenv-build
 */

import { build } from "@jsenv/core"
import { copyEntry } from "@jsenv/filesystem"
import { jsenvPluginReact } from "@jsenv/plugin-react"
import { jsenvPluginBundling } from "@jsenv/plugin-bundling"
import { jsenvPluginMinification } from "@jsenv/plugin-minification"

// this is to get the production build of react
process.env.NODE_ENV = "production"

await build({
  logLevel: process.env.LOG_LEVEL,
  sourceDirectoryUrl: new URL("../src/", import.meta.url),
  entryPoints: {
    "./main.html": "index.html",
  },
  buildDirectoryUrl: new URL("../dist/", import.meta.url),
  plugins: [
    jsenvPluginReact(),
    jsenvPluginBundling(),
    ...(process.argv.includes("--prod") ? [jsenvPluginMinification()] : []),
  ],
  base: process.argv.includes("--prod") ? "/mille-sabords/" : "/",
  runtimeCompat: {
    chrome: "80",
    edge: "17",
    firefox: "80",
    safari: "17",
  },
  watch: process.argv.includes("--watch"),
})

await copyEntry({
  from: new URL("../src/robots.txt", import.meta.url),
  to: new URL("../dist/robots.txt", import.meta.url),
})
