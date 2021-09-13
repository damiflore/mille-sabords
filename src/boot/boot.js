import { nextIDLEPromise } from "src/helper/asap.js"

// window.splashscreen.takeOver() means this code is taking responsability of the splashscreen.
// It prevents main.html to display <div id="booting_is_slow"></div> to the user
// window.splashscreen.takeOver()

const { createMilleSabordGame } = await import("../app.js")
// createMilleSabordGame can be very expensive so we wait a bit
// to let navigator an opportunity to cooldown.
// This should help to save battery power and RAM
await nextIDLEPromise()

createMilleSabordGame({
  into: document.querySelector("#app"),
  onError: () => {
    window.splashscreen.appIsReady()
  },
  onReady: () => {
    window.splashscreen.appIsReady()
  },
})
