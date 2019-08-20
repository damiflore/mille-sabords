const { exec } = require("child_process")

const run = async () => {
  process.env.PORT = 8080
  const { serverPromise } = require("../start/start.js")

  const server = await serverPromise
  try {
    await new Promise((resolve, reject) => {
      exec("npm run lighthousebot", (error, stdout) => {
        if (error) {
          reject(error)
        } else {
          resolve(stdout)
        }
      })
    })
  } finally {
    server.stop()
  }
}
run()
