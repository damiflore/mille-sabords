import { registerServiceWorker } from "@jsenv/pwa"
import { createMilleSabordGame } from "./createMilleSabordGame.js"

createMilleSabordGame({
  into: document.querySelector("#app"),
})

registerServiceWorker("/service-worker.js")
