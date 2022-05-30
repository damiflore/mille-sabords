/*
 * This file uses "@jsenv/core" to start a development server.
 * https://github.com/jsenv/jsenv-core/tree/master/docs/dev_server#jsenv-dev-server
 */

import { startDevServer } from "@jsenv/core"
import { requestCertificateForLocalhost } from "@jsenv/https-local"

import { rootDirectoryUrl, plugins } from "../../jsenv.config.mjs"

const { serverCertificate, serverCertificatePrivateKey } =
  await requestCertificateForLocalhost()

export const server = await startDevServer({
  rootDirectoryUrl,
  plugins,
  port: 3472,
  protocol: "https",
  certificate: serverCertificate,
  privateKey: serverCertificatePrivateKey,
  explorerGroups: {
    "app": {
      "./src/main.html": true,
      "./lab/lab.html": true,
      "./client/main.html": true,
    },
    "manual tests": {
      "./src/**/*.scenario.html": true,
      "./test-manual/**/*.scenario.html": true,
    },
    "unit tests": {
      "./src/**/*.test.html": true,
      "./test/**/*.test.html": true,
    },
  },
  // autoreload: false
  devServerMainFile: import.meta.url,
  devServerAutoreload: true,
})