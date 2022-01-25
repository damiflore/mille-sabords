/*
 * This file is designed to be executed locally or by an automated process.
 *
 * To run it locally, use one of
 * - node ./script/file_size/file_size.mjs --local
 * - npm run file-sizes
 *
 * The automated process is a GitHub workflow: ".github/workflows/file_size_impact.yml"
 * It will dynamically import this file and call generateFileSizeReport.
 *
 * See https://github.com/jsenv/file-size-impact
 */

import { generateFileSizeReport, raw, gzip } from "@jsenv/file-size-impact"

import { projectDirectoryUrl } from "../../jsenv.config.mjs"

const revertTrackingGroup = (trackingGroup) => {
  const opposite = {}
  Object.keys(trackingGroup).forEach((pattern) => {
    opposite[pattern] = !trackingGroup[pattern]
  })
  return opposite
}

const booting = {
  "./dist/systemjs/main.prod.html": true,
  "./dist/systemjs/app_loader_*.js": true,
  "./dist/systemjs/assets/app_loader_*.css": true,
  "./dist/systemjs/assets/arrr_matey_bb_wn3*.woff": true,
}
const app = {
  "./dist/systemjs/**/*": true,
  "./dist/systemjs/**/*.map": false,
  ...revertTrackingGroup(booting),
}

export const fileSizeReport = await generateFileSizeReport({
  log: process.argv.includes("--log"),
  projectDirectoryUrl,
  transformations: { raw, gzip },
  trackingConfig: { booting, app },
  manifestConfig: {
    "./dist/**/asset-manifest.json": true,
  },
})
