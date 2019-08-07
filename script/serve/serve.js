const { startServer, serveFile } = require("@dmail/server")
const { projectPath } = require("../../jsenv.config.js")

startServer({
  protocol: "http",
  ip: "",
  port: process.env.PORT || 0,
  requestToResponse: ({ ressource, method, headers }) =>
    serveFile(`${projectPath}${ressource}`, {
      method,
      headers,
    }),
})
