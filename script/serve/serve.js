const { resolve } = require("path")
const { startServer, serveFile } = require("@dmail/server")

const projectPath = resolve(__dirname, "../../")

startServer({
  protocol: "http",
  ip: "",
  port: process.env.PORT || 0,
  requestToResponse: ({ ressource, method, headers }) => {
    if (ressource === "/") {
      ressource = "/index.html"
    }
    return serveFile(`${projectPath}${ressource}`, {
      method,
      headers,
    })
  },
})
