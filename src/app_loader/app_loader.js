import { DEV } from "#env"
import { loadCSSAndFonts, nextIDLEPromise } from "./app_loader_utils.js"

export const loadApp = async ({ updateSplashscreenText }) => {
  if (DEV) {
    performance.measure(`loading app`)
  }

  // try to load CSS + get the main fonts before displaying any text
  // to avoid font swapping if possible
  // give max 400ms for this
  const appLoaderCssPromise = loadCSSAndFonts(
    new URL("./app_loader.css", import.meta.url),
    {
      timeout: 400,
      onCssReady: () => {
        if (DEV) {
          performance.measure(`app_loader.css ready`)
        }
      },
      onFontsReady: () => {
        if (DEV) {
          performance.measure(`fonts ready`)
        }
      },
    },
  )
  // start importing app right away
  const appPromise = importApp({
    onJsReady: () => {
      if (DEV) {
        performance.measure("app.js ready")
      }
    },
  })
  const appCSSPromise = loadCSSAndFonts(
    new URL("../app/app.css", import.meta.url),
    {
      onCssReady: () => {
        if (DEV) {
          performance.measure(`app.css ready`)
        }
      },
    },
  )

  await appLoaderCssPromise
  const app = await appPromise
  if (DEV) {
    performance.measure(`rendering app`)
  }
  await app.createMilleSabordGame({
    into: document.querySelector("#app"),
    onLoadProgress: ({ loadedCount, total }) => {
      updateSplashscreenText(`
  Chargement du jeu...
  <div>${loadedCount}/${total}</div>
`)
    },
  })
  await appCSSPromise
  // app.render() can be very expensive so we wait a bit
  // to let navigator an opportunity to cooldown
  // This should help to save battery power and RAM
  await nextIDLEPromise()
  if (DEV) {
    performance.measure(`app rendered`)
  }
}

const importApp = async ({ onJsReady = () => {} }) => {
  const app = await import("../app/app.jsx")
  onJsReady()
  return app
}
