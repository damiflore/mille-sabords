import {
  generateSnapshotFile,
  none,
  gzip,
  brotli,
} from "@jsenv/github-pull-request-filesize-impact"
import { projectDirectoryUrl } from "../../../jsenv.config.js"

generateSnapshotFile({
  projectDirectoryUrl,
  snapshotFileRelativeUrl: process.argv[2],
  trackingConfig: {
    "dist/systemjs": {
      "./dist/systemjs/**/*": true,
      "./dist/systemjs/**/*.map": false,
    },
  },
  transformations: { none, gzip, brotli },
})
