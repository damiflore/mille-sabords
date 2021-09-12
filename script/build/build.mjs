/*
 * This file uses "@jsenv/core" to convert source files into systemjs format
 * and write them into "./dist/" directory.
 *
 * Read more at https://github.com/jsenv/jsenv-core/blob/master/docs/building/readme.md#jsenv-build
 */

import { buildProject, jsenvServiceWorkerFinalizer } from "@jsenv/core"
import { copyFileSystemNode, resolveUrl } from "@jsenv/filesystem"

import * as jsenvConfig from "../../jsenv.config.js"

// this is to get the production build of react
process.env.NODE_ENV = "production"

await buildProject({
  ...jsenvConfig,
  format: "systemjs",
  systemJsUrl: "/node_modules/systemjs/dist/s.js",
  buildDirectoryClean: true,
  entryPointMap: {
    "./main.html": "./main.prod.html",
  },
  urlMappings: {
    "./dev.importmap": "./prod.importmap",
  },
  serviceWorkers: {
    "./service-worker.js": "./service-worker.js",
  },
  serviceWorkerFinalizer: jsenvServiceWorkerFinalizer,
  // disable preserveEntrySignatures otherwise an empty (and useless) file is generated
  // as main js entry point
  preserveEntrySignatures: false,
  minify: true,
  minifyHtmlOptions: {
    collapseWhitespace: true,
    removeComments: true,
  },
  assetManifestFile: true,
  assetManifestFileRelativeUrl: "asset-manifest.json",
})

const robotsProjectFileUrl = resolveUrl("robots.txt", jsenvConfig.projectDirectoryUrl)
const buildDirectoryUrl = resolveUrl("dist/systemjs/", jsenvConfig.projectDirectoryUrl)
const robotsBuildFileUrl = resolveUrl("robots.txt", buildDirectoryUrl)
await copyFileSystemNode({ from: robotsProjectFileUrl, to: robotsBuildFileUrl })
