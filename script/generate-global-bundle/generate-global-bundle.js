const { generateGlobalBundle } = require("@jsenv/bundling")
const { projectPath, babelPluginMap, convertMap } = require("../../jsenv.config.js")
const { generateImportMapForProjectPackage } = require("@jsenv/node-module-import-map")

// TODO: change this for system format
// so that we can use dynamic import and benefit
// from code splitting

// this is to get the production build of react
process.env.NODE_ENV = "production"

// this is to avoid generating importMap for devDependencies
const importMapRelativePath = "/dist/importMap.json"

exports.bundlePromise = generateImportMapForProjectPackage({
  projectPath,
  includeDevDependencies: false,
  importMapFileRelativePath: importMapRelativePath,
  importMapFile: true,
}).then(() => {
  return generateGlobalBundle({
    projectPath,
    babelPluginMap,
    importMapRelativePath,
    convertMap,
    globalName: "__mille_sabords__",
    minify: true,
  })
})
