import { startServer, serveFile } from "@jsenv/server"

const resolveUrl = (specifier, baseUrl) => String(new URL(specifier, baseUrl))

const projectDirectoryUrl = new URL("./", import.meta.url)

export const serverPromise = startServer({
  protocol: "http",
  ip: "",
  port: process.env.PORT || 0,
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
