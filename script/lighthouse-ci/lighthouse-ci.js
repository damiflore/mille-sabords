const { exec } = require("child_process")

const run = async () => {
  process.env.PORT = 8080
  const { serverPromise } = require("../start/start.js")
  console.log("process.env.TRAVIS_PULL_REQUEST", process.env.TRAVIS_PULL_REQUEST)

  const server = await serverPromise
  try {
    await new Promise((resolve, reject) => {
      exec(
        "npm run lighthousebot",
        {
          env: process.env,
        },
        (error, stdout) => {
          if (error) {
            reject(error)
          } else {
            resolve(stdout)
          }
        },
      )
    })
  } finally {
    server.stop("lighthouse report done")
  }
}
run()
