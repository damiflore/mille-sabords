/*
 * This file uses "@jsenv/core" to start a development server.
 * https://github.com/jsenv/jsenv-core/tree/master/docs/dev_server#jsenv-dev-server
 */

import { startDevServer } from "@jsenv/core"
import { requestCertificate } from "@jsenv/https-local"
import { jsenvPluginReact } from "@jsenv/plugin-react"

const { certificate, privateKey } = await requestCertificate()

export const devServer = await startDevServer({
  sourceDirectoryUrl: new URL("../src/", import.meta.url),
  https: { certificate, privateKey },
  port: 3472,
  plugins: [jsenvPluginReact()],
  explorer: {
    groups: {
      "app": {
        "./main.html": true,
        "./lab/lab.html": true,
      },
      "manual tests": {
        "./**/*.scenario.html": true,
      },
      "unit tests": {
        "./**/*.test.html": true,
      },
    },
  },
})
