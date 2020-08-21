import { generateLighthouseReport } from "@jsenv/lighthouse-score-impact"

const run = async () => {
  const { bundlePromise } = await import("../generate-systemjs-bundle/generate-systemjs-bundle.js")
  await bundlePromise

  process.env.LOG_LEVEL = "warn"
  // process.env.HTTPS = true
  const { serverPromise } = await import("../start/start.js")
  const server = await serverPromise

  await generateLighthouseReport(server.origin, {
    projectDirectoryUrl: new URL("../../", import.meta.url),
    runCount: 4,
    ignoreCertificateErrors: true,
  })

  server.stop("lighthouse report generated")
}
run()
