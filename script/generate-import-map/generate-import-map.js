const { generateImportMapForNodeModules } = require("@jsenv/node-module-import-map")
const { projectPath } = require("../../jsenv.config.js")

generateImportMapForNodeModules({
  projectPath,
  inputImportMap: {
    scopes: {
      "/node_modules/react-dom/": {
        "/react": "/node_modules/react/index.js",
      },
    },
  },
  writeImportMapFile: true,
  writeJsConfigFile: true,
  scopeOriginRelativePerModule: true,
})
