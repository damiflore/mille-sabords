/* eslint-disable import/max-dependencies */
import React from "react"
import { useGameCreated } from "src/main.store.js"
import { useMainDomNodeSetter } from "src/dom/dom.main.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { Home } from "src/home/Home.jsx"
import { Game } from "src/game/Game.jsx"
import { catchError } from "src/error/error.main.js"
import { UrlLoadingProvider, useUrlTracking } from "src/loading/loading.main.js"
// import { ImagePreloader } from "src/loading/ImagePreloader.jsx"
import { symbolSkullUrl } from "src/symbols/symbols.js"
import { Image } from "src/generic/Image.jsx"

import milleSabordsCssUrl from "../mille-sabord.css"
import loadscreenCssUrl from "../loadscreen.css"

const MainRaw = (props) => {
  return (
    <UrlLoadingProvider>
      <LoadingScreen>
        <div id="main-container">
          <div id="main" ref={useMainDomNodeSetter()}>
            <Stylesheet href={milleSabordsCssUrl} />
            <AppBody {...props} />
          </div>
        </div>
      </LoadingScreen>
    </UrlLoadingProvider>
  )
}

const LoadingScreen = ({ children }) => {
  const loadingScreenUrlTracking = useUrlTracking()
  console.log(loadingScreenUrlTracking)

  const [loadingScreenLoaded, loadingScreenLoadedSetter] = React.useState(false)

  React.useEffect(() => {
    if (loadingScreenUrlTracking.urlTrackingReady && loadingScreenUrlTracking.urlAllLoaded) {
      loadingScreenLoadedSetter(true)
    }
  }, [loadingScreenUrlTracking.urlTrackingReady, loadingScreenUrlTracking.urlAllLoaded])

  React.useEffect(() => {
    window.splashscreen.remove()
  }, [loadingScreenLoaded])

  // React.useEffect(() => {
  //   if (!urlTrackingReady || !urlAllLoaded) {
  //     loadingScreenDisplayedSetter(true)
  //     return () => {}
  //   }

  //   const callbackRequestId = window.requestIdleCallback(
  //     () => {
  //       loadingScreenDisplayedSetter(false)
  //       // console.info(`all game ressource loaded`, Object.keys(assetsTracking))
  //     },
  //     { timeout: 400 },
  //   )
  //   return () => {
  //     window.cancelIdleCallback(callbackRequestId)
  //   }
  // }, [urlTrackingReady, urlAllLoaded])

  return (
    <>
      {/* {loadingScreenLoaded ? children : null} */}
      <div id="loadscreen">
        <Stylesheet href={loadscreenCssUrl} />
        <Image src={symbolSkullUrl} />
      </div>
    </>
  )
}

const AppBody = (props) => {
  const gameCreated = useGameCreated()

  if (gameCreated) {
    return <Game {...props} />
  }

  return <Home {...props} />
}

const ErrorScreen = ({ error }) => {
  window.splashscreen.remove()
  return (
    <div>
      An error occured<pre>{typeof error === "object" ? error.stack : error}</pre>
    </div>
  )
}

export const Main = catchError(MainRaw, ErrorScreen)
