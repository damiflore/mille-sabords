const { startServer, serveFile } = require("@dmail/server")
const { projectPath } = require("../../jsenv.config.js")

startServer({
  protocol: "http",
  ip: "127.0.0.1",
  port: process.env.PORT || 0,
  requestToResponse: ({ ressource, method, headers }) =>
    serveFile(`${projectPath}${ressource}`, {
      method,
      headers,
    }),
})
