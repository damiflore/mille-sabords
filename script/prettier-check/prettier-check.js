const { prettierCheckProject, jsenvPrettifyMap } = require("@jsenv/prettier-check-project")
const { projectDirectoryPath } = require("../../jsenv.config.js")

prettierCheckProject({
  projectPath: projectDirectoryPath,
  prettifyMap: {
    ...jsenvPrettifyMap,
    "/.jsenv/": false,
  },
})
