/*
 * This file uses "@jsenv/core" to start a development server.
 * https://github.com/jsenv/jsenv-core/blob/master/docs/exploring/readme.md#jsenv-dev-server
 */

import { startExploring } from "@jsenv/core"
import { requestCertificateForLocalhost } from "@jsenv/https-local"

import * as jsenvConfig from "../../jsenv.config.mjs"

const {
  serverCertificate,
  serverCertificatePrivateKey,
} = await requestCertificateForLocalhost()

export const server = await startExploring({
  ...jsenvConfig,
  compileServerPort: 3472,
  compileServerCertificate: serverCertificate,
  compileServerPrivateKey: serverCertificatePrivateKey,
  explorableConfig: {
    "app": {
      "./main.html": true,
      "./lab.html": true,
    },
    "manual tests": {
      "src/**/*.scenario.html": true,
      "test-manual/**/*.scenario.html": true,
    },
    "unit tests": {
      "src/**/*.test.html": true,
      "test/**/*.test.html": true,
    },
  },
})
