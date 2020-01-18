const { generateSnapshotFile } = require("@jsenv/github-pull-request-filesize-impact")
const { projectDirectoryUrl } = require("../jsenv.config.js")

generateSnapshotFile({
  projectDirectoryUrl,
  directorySizeTrackingConfig: {
    "./dist/global": {
      "./**/*.js": true,
      "./**/*.js.map": false,
    },
  },
  snapshotFileRelativeUrl: process.argv[2],
})
