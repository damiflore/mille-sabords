import { startServer, serveFile } from "@jsenv/server"

// not taken from jsenv.config.js because this code
// will run in production and jsenv.config.js depends on
// @jsenv/core which is a devDependency
const projectDirectoryUrl = new URL("../../", import.meta.url)

const resolveUrl = (specifier, baseUrl) => String(new URL(specifier, baseUrl))

const bundleDirectoryUrl = resolveUrl("./dist/systemjs/", projectDirectoryUrl)
const mainHtmlFileUrl = resolveUrl("index.prod.html", bundleDirectoryUrl)

const SECONDS_IN_30_DAYS = 60 * 60 * 24 * 30
const BUNDLE_FILE_CACHE_VALIDITY_IN_SECONDS = SECONDS_IN_30_DAYS

export const serverPromise = startServer({
  logLevel: process.env.LOG_LEVEL || "info",
  protocol: process.env.HTTPS ? "https" : "http",
  http2: Boolean(process.env.HTTPS),
  ip: "",
  port: process.env.PORT || 0,
  redirectHttpToHttps: Boolean(process.env.HTTPS),
  requestToResponse: ({ cancellationToken, ressource, method, headers }) => {
    if (ressource === "/") {
      ressource = "/index.prod.html"
    }
    const fileUrl = resolveUrl(ressource.slice(1), bundleDirectoryUrl)
    const longTermCacheEnabled =
      fileUrl !== mainHtmlFileUrl && fileUrl.startsWith(bundleDirectoryUrl)

    return serveFile(fileUrl, {
      cancellationToken,
      method,
      headers,
      cacheControl: longTermCacheEnabled
        ? `private,max-age=${BUNDLE_FILE_CACHE_VALIDITY_IN_SECONDS},immutable`
        : `private,max-age=0,must-revalidate`,
      etagEnabled: true,
    })
  },
})
