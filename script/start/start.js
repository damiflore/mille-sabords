const { resolve } = require("path")
const { startServer, serveFile } = require("@dmail/server")
const { operatingSystemPathToPathname } = require("@jsenv/operating-system-path")

const projectPath = resolve(__dirname, "../../")

startServer({
  protocol: "https",
  ip: "",
  port: process.env.PORT || 0,
  requestToResponse: ({ ressource, method, headers }) => {
    if (ressource === "/") {
      ressource = "/index.prod.html"
    }
    return serveFile(`${operatingSystemPathToPathname(projectPath)}${ressource}`, {
      method,
      headers,
    })
  },
})
