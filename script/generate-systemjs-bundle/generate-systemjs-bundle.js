import { generateSystemJsBundle } from "@jsenv/core"
import {
  generateImportMapForProject,
  getImportMapFromNodeModules,
  getImportMapFromFile,
} from "@jsenv/node-module-import-map"
import * as jsenvConfig from "../../jsenv.config.js"

// this is to get the production build of react
// and to remove dev dependencies from importmap
process.env.NODE_ENV = "production"

const importMapFileRelativeUrl = "./dist/bundle.importmap"

await generateImportMapForProject(
  [
    getImportMapFromNodeModules({
      projectDirectoryUrl: jsenvConfig.projectDirectoryUrl,
      projectPackageDevDependenciesIncluded: false,
    }),
    getImportMapFromFile(new URL("./import-map-custom.importmap", jsenvConfig.projectDirectoryUrl)),
  ],
  {
    projectDirectoryUrl: jsenvConfig.projectDirectoryUrl,
    importMapFileRelativeUrl,
  },
)
await generateSystemJsBundle({
  ...jsenvConfig,
  bundleDirectoryClean: true,
  formatInputOptions: {
    preserveEntrySignatures: false,
  },
  entryPointMap: {
    "index.prod.html": "./index.html",
  },
  importMapFileRelativeUrl,
  systemJsScript: {
    src: "/node_modules/systemjs/dist/s.js",
  },
  minify: true,
  manifestFile: true,
})
