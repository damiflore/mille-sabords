/*
 * This file is designed to be executed locally or by an automated process.
 *
 * To run it locally, use one of
 * - node ./scripts/file_size/file_size.mjs --local
 * - npm run file-sizes
 *
 * The automated process is a GitHub workflow: ".github/workflows/file_size_impact.yml"
 * It will dynamically import this file and call generateFileSizeReport.
 *
 * See https://github.com/jsenv/file-size-impact
 */

import { generateFileSizeReport, raw, gzip } from "@jsenv/file-size-impact"

const revertTrackingGroup = (trackingGroup) => {
  const opposite = {}
  Object.keys(trackingGroup).forEach((pattern) => {
    opposite[pattern] = !trackingGroup[pattern]
  })
  return opposite
}

const app_loader = {
  "./dist/index.html": true,
  "./dist/js/app_loader.es5.js": true,
  "./dist/other/arrr_matey_bb_wn3.woff": true,
}
const app = {
  "./dist/**/*": true,
  "./dist/**/*.map": false,
  ...revertTrackingGroup(app_loader),
}

export const fileSizeReport = await generateFileSizeReport({
  log: process.argv.includes("--log"),
  rootDirectoryUrl: new URL("../", import.meta.url),
  transformations: { raw, gzip },
  trackingConfig: { app_loader, app },
  manifestConfig: {
    "./dist/**/asset-manifest.json": true,
  },
})
