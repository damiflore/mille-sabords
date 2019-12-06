const { startServer, serveFile } = require("@jsenv/server")
const { pathToFileURL } = require("url")

const resolveUrl = (specifier, baseUrl) => String(new URL(specifier, baseUrl))

const projectDirectoryUrl = resolveUrl("../", pathToFileURL(__dirname))

exports.serverPromise = startServer({
  protocol: "http",
  ip: "",
  port: process.env.PORT || 0,
  requestToResponse: ({ ressource, method, headers }) => {
    if (ressource === "/") {
      ressource = "/index.prod.html"
    }
    return serveFile(resolveUrl(ressource.slice(1), projectDirectoryUrl), {
      method,
      headers,
    })
  },
})
