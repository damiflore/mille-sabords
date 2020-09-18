import { startServer, serveFile } from "@jsenv/server"

// not taken from jsenv.config.js because this code
// will run in production and jsenv.config.js depends on
// @jsenv/core which is a devDependency
const projectDirectoryUrl = new URL("../../", import.meta.url)

const resolveUrl = (specifier, baseUrl) => String(new URL(specifier, baseUrl))

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
    return serveFile(resolveUrl(ressource.slice(1), projectDirectoryUrl), {
      cancellationToken,
      method,
      headers,
    })
  },
})
