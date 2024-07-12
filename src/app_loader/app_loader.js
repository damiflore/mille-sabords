import appLoaderStylesheet from "./app_loader.css" with { type: "css" }

export const loadApp = async ({ appNode }) => {
  performance.measure(`loading app`)
  document.adoptedStyleSheets = [
    ...document.adoptedStyleSheets,
    appLoaderStylesheet,
  ]
  const appJsPromise = loadAppJs()
  const appCssPromise = loadAppCss(new URL("/app/app.css", import.meta.url))

  const app = await appJsPromise
  performance.measure(`rendering app`)
  await app.createMilleSabordGame({
    into: appNode,
    onLoadProgress: () => {},
  })
  performance.measure(`app rendered`)
  await Promise.all([
    // wait for CSS to be loaded before displaying the app
    appCssPromise,
    // app.render() can be very expensive so we wait a bit
    // to let navigator an opportunity to cooldown
    // This should help to save battery power and RAM
    new Promise((resolve) => {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(resolve, { timeout: 60 })
      } else {
        window.requestAnimationFrame(resolve)
      }
    }),
  ])
  performance.measure(`app displayed`)
}

const loadAppJs = async () => {
  const app = await import("/app/app.jsx")
  performance.measure("app.js ready")
  return app
}

const loadAppCss = async (cssUrl, { crossOrigin } = {}) => {
  const cssPromise = new Promise((resolve, reject) => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.onload = resolve
    link.onerror = reject
    link.href = cssUrl
    link.crossOrigin = crossOrigin
    document.head.appendChild(link)
  })
  await cssPromise
  performance.measure(`app.css ready`)
}
