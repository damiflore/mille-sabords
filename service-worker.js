/* globals self, config */

self.importScripts("./node_modules/@jsenv/core/src/sw.preconfig.js")

config.cacheName = "mille-sabords"
config.urlMap = { "/": "main.prod.html" }
config.extraUrlsToCacheOnInstall = []

self.importScripts("./node_modules/@jsenv/core/src/sw.jsenv.js")
