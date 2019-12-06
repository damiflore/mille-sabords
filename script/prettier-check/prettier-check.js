const { prettierCheckProject } = require("@jsenv/prettier-check-project")
const { projectDirectoryPath } = require("../../jsenv.config.js")

prettierCheckProject({
  projectPath: projectDirectoryPath,
})
