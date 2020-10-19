import {
  generateImportMapForProject,
  getImportMapFromNodeModules,
  getImportMapFromFile,
} from "@jsenv/node-module-import-map"
import { projectDirectoryUrl } from "../../jsenv.config.js"

const generateFile = async (importMapFileRelativeUrl, { includeDevDependencies = false } = {}) => {
  await generateImportMapForProject(
    [
      getImportMapFromNodeModules({
        projectDirectoryUrl,
        includeDevDependencies: false,
      }),
      getImportMapFromFile(new URL("./importmap.project.importmap", projectDirectoryUrl)),
    ],
    {
      projectDirectoryUrl,
      importMapFileRelativeUrl,
      jsConfigFile: includeDevDependencies,
    },
  )
}

generateFile("importmap.prod.importmap")
generateFile("importmap.dev.importmap", { includeDevDependencies: true })
