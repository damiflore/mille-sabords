import { generateBundle } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

// this is to get the production build of react
process.env.NODE_ENV = "production"

await generateBundle({
  ...jsenvConfig,
  format: "systemjs",
  systemJsUrl: "/node_modules/systemjs/dist/s.js",
  bundleDirectoryClean: true,
  entryPointMap: {
    "./index.html": "./index.prod.html",
  },
  minify: true,
  manifestFile: true,
})
