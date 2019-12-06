const { generateImportMapForProjectPackage } = require("@jsenv/node-module-import-map")
const { projectDirectoryPath } = require("../../jsenv.config.js")

generateImportMapForProjectPackage({
  projectDirectoryPath,
  includeDevDependencies: true,
  includeImports: true,
  includeExports: true,
  importMapFile: true,
  jsConfigFile: true,
})
