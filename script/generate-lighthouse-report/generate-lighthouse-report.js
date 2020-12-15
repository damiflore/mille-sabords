import { generateLighthouseReport } from "@jsenv/lighthouse-score-impact"

const run = async () => {
  await import("../generate-systemjs-build/generate-systemjs-build.js")

  process.env.LOG_LEVEL = "warn"
  process.env.HTTPS = true
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
