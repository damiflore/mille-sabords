const { writeFileSync } = require("fs")
const { generateImportMapForProjectNodeModules } = require("@jsenv/node-module-import-map")
const { projectPath } = require("../../jsenv.config.js")

const run = async () => {
  const importMap = await generateImportMapForProjectNodeModules({
    projectPath,
    writeImportMapFile: false,
  })

  importMap.imports.react = `${importMap.imports.react}.esm.js`
  importMap.imports["react-dom"] = `${importMap.imports["react-dom"]}.esm.js`

  const importMapAsString = JSON.stringify(importMap, null, "  ")
  const importMapPath = `${projectPath}/importMap.json`
  writeFileSync(importMapPath, importMapAsString)
}

run()
