import { generateLighthouseReport } from "@dmail/lighthouse-report"
import { projectDirectoryUrl } from "../../jsenv.config.js"

const run = async () => {
  const { bundlePromise } = await import("../generate-systemjs-bundle/generate-systemjs-bundle.js")
  await bundlePromise
  const { serverPromise } = await import("../start/start.js")
  const server = await serverPromise

  await generateLighthouseReport({
    url: server.origin,
    projectPath: projectDirectoryUrl,
  })

  server.stop("lighthouse report generated")
}
run()
