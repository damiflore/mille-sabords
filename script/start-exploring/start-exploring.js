import { startExploring } from "@jsenv/core"
import * as jsenvConfig from "../../jsenv.config.js"

startExploring({
  ...jsenvConfig,
  htmlFileRelativeUrl: "./index.dev.html",
  port: 3472,
})
