/*
 * This file is designed to be executed locally or by an automated process.
 *
 * To run it locally, use one of
 * - node ./scripts/lighthouse/lighthouse.mjs --local
 * - npm run lighthouse
 *
 * The automated process is a GitHub workflow: ".github/workflows/lighthouse_impact.yml"
 * It will dynamically import this file and call generateLighthouseReport.
 *
 * See https://github.com/jsenv/lighthouse-impact
 */

import openUrl from "open"
import { chromium } from "playwright"
import { pingServer } from "@jsenv/test/src/helpers/ping_server.js"
import { runLighthouseOnPlaywrightPage } from "@jsenv/lighthouse-impact"

// discard logs related to build
process.env.LOG_LEVEL = "warn"
await import(`./build.mjs`)

const buildServerOrigin = "https://localhost:9779"
const buildServerStarted = await pingServer(buildServerOrigin)
let buildServerModule
if (!buildServerStarted) {
  buildServerModule = await import("./build_serve.mjs")
}

const browser = await chromium.launch({
  args: ["--remote-debugging-port=9222", "--ignore-certificate-errors"],
})
const browserContext = await browser.newContext({
  // userAgent: "",
  ignoreHTTPSErrors: true, // prevent a CERT_INVALID error on jsenv self signed certificate
  viewport: {
    width: 640,
    height: 360,
  },
  screen: {
    width: 640,
    height: 360,
  },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 4,
})
const page = await browserContext.newPage()
await page.goto(buildServerOrigin)

let lighthouseReport
try {
  lighthouseReport = await runLighthouseOnPlaywrightPage(page, {
    chromiumDebuggingPort: 9222,
    runCount: 1,
    log: true,
    htmlFileUrl: new URL("../.jsenv/lighthouse_report.html", import.meta.url),
    jsonFileUrl: new URL("../.jsenv/lighthouse_report.json", import.meta.url),
  })
  if (process.argv.includes("--open")) {
    openUrl(new URL("../.jsenv/lighthouse_report.html", import.meta.url).href)
  }
} finally {
  await browserContext.close()
  await browser.close()
  if (buildServerModule) {
    buildServerModule.buildServer.stop()
  }
}

export { lighthouseReport }
