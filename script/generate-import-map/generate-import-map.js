const { generateImportMapForProjectNodeModules } = require("@jsenv/node-module-import-map")
const { projectPath } = require("../../jsenv.config.js")

generateImportMapForProjectNodeModules({
  projectPath,
  inputImportMap: {
    scopes: {
      "/node_modules/react-dom/": {
        "/react": "/node_modules/react/index.js",
      },
    },
  },
})
