/*
 * This file uses "@jsenv/core" to convert source files into systemjs format
 * and write them into "./dist/" directory.
 *
 * Read more at https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#jsenv-build
 */

import { buildProject, jsenvServiceWorkerFinalizer } from "@jsenv/core"
import { copyFileSystemNode, resolveUrl } from "@jsenv/filesystem"

import {
  projectDirectoryUrl,
  customCompilers,
  classicServiceWorkers,
  runtimeSupport,
} from "../../jsenv.config.mjs"

// this is to get the production build of react
process.env.NODE_ENV = "production"

await buildProject({
  projectDirectoryUrl,
  customCompilers,
  classicServiceWorkers,
  runtimeSupport,
  buildDirectoryRelativeUrl: "./dist/systemjs/",
  format: "systemjs",
  buildDirectoryClean: true,
  entryPoints: {
    "./main.html": "main.prod.html",
  },
  urlMappings: {
    "./dev.importmap": "./prod.importmap",
  },
  serviceWorkerFinalizer: jsenvServiceWorkerFinalizer,
  preserveEntrySignatures: false,
  minify: true,
  minifyHtmlOptions: {
    collapseWhitespace: true,
    removeComments: true,
  },
  logLevel: process.env.LOG_LEVEL,
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
})

const robotsProjectFileUrl = resolveUrl("robots.txt", projectDirectoryUrl)
const buildDirectoryUrl = resolveUrl("dist/systemjs/", projectDirectoryUrl)
const robotsBuildFileUrl = resolveUrl("robots.txt", buildDirectoryUrl)
await copyFileSystemNode({ from: robotsProjectFileUrl, to: robotsBuildFileUrl })
