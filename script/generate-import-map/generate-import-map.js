import {
  generateImportMapForProject,
  getImportMapFromNodeModules,
  getImportMapFromFile,
} from "@jsenv/node-module-import-map"
import { projectDirectoryUrl } from "../../jsenv.config.js"

await generateImportMapForProject(
  [
    getImportMapFromNodeModules({
      projectDirectoryUrl,
    }),
    getImportMapFromFile(new URL("./import-map-custom.importmap", projectDirectoryUrl)),
  ],
  {
    projectDirectoryUrl,
    jsConfigFile: true,
  },
)
