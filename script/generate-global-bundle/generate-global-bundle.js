const { generateGlobalBundle } = require("@jsenv/core")
const jsenvConfig = require("../../jsenv.config.js")
const { generateImportMapForProjectPackage } = require("@jsenv/node-module-import-map")

// TODO: change this for system format
// so that we can use dynamic import and benefit
// from code splitting

// this is to get the production build of react
process.env.NODE_ENV = "production"

// this is to avoid generating importMap for devDependencies
const importMapFileRelativeUrl = "./dist/importMap.json"

exports.bundlePromise = generateImportMapForProjectPackage({
  ...jsenvConfig,
  importMapFileRelativeUrl,
  importMapFile: true,
}).then(() => {
  return generateGlobalBundle({
    ...jsenvConfig,
    importMapFileRelativeUrl,
    globalName: "__mille_sabords__",
    minify: true,
  })
})
