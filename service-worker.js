/* globals self, config */

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.setup.js")

config.cacheName = "mille-sabords"
// config.logLevel = "debug"

self.importScripts("./node_modules/@jsenv/pwa/src/service-worker.main.js")
