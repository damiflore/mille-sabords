import { generateSystemJsBundle } from "@jsenv/core"
import { generateImportMapForProjectPackage } from "@jsenv/node-module-import-map"
import * as jsenvConfig from "../../jsenv.config.js"

// this is to get the production build of react
process.env.NODE_ENV = "production"

// this is to avoid generating importMap for devDependencies
const importMapFileRelativeUrl = "./dist/importMap.json"

export const bundlePromise = generateImportMapForProjectPackage({
  ...jsenvConfig,
  bundleDirectoryClean: true,
  importMapFileRelativeUrl,
  importMapFile: true,
}).then(() => {
  return generateSystemJsBundle({
    ...jsenvConfig,
    importMapFileRelativeUrl,
    minify: true,
  })
})
