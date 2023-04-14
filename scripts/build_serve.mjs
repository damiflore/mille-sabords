import { startBuildServer } from "@jsenv/core"
import { requestCertificate } from "@jsenv/https-local"

const { certificate, privateKey } = await requestCertificate()

export const buildServer = await startBuildServer({
  logLevel: process.env.LOG_LEVEL,
  https: { certificate, privateKey },
  buildDirectoryUrl: new URL("../dist/", import.meta.url),
  buildMainFilePath: "/index.html",
})
