/*
 * This file uses "@jsenv/core" to convert source files into systemjs format
 * and write them into "./dist/" directory.
 *
 * Read more at https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#jsenv-build
 */

import { build } from "@jsenv/core"
import { copyEntry } from "@jsenv/filesystem"

import { rootDirectoryUrl, runtimeCompat } from "../../jsenv.config.mjs"

// this is to get the production build of react
process.env.NODE_ENV = "production"

await build({
  logLevel: process.env.LOG_LEVEL,
  rootDirectoryUrl,
  buildDirectoryUrl: new URL("./dist/", rootDirectoryUrl),
  buildDirectoryClean: true,
  entryPoints: {
    "./main.html": "index.html",
  },
  baseUrl: process.argv.includes("--prod") ? "/mille-sabords/" : "/",
  runtimeCompat,
  sourcemaps: process.argv.includes("--lighthouse"),
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
})

await copyEntry({
  from: new URL("src/robots.txt", rootDirectoryUrl),
  to: new URL("dist/robots.txt", rootDirectoryUrl),
})
