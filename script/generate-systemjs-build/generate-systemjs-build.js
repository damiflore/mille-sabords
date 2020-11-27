import { buildProject } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

// this is to get the production build of react
process.env.NODE_ENV = "production"

await buildProject({
  ...jsenvConfig,
  format: "systemjs",
  systemJsUrl: "/node_modules/systemjs/dist/s.js",
  buildDirectoryClean: true,
  entryPointMap: {
    "./index.html": "./index.prod.html",
  },
  // disable preserveEntrySignatures otherwise an empty (and useless) file is generated
  // as main js entry point
  preserveEntrySignatures: false,
  minify: true,
  manifestFile: true,
})