/* eslint-disable import/max-dependencies */
import React from "react"
import { requestAsapCallback } from "src/helper/asap.js"
import { useGameCreated } from "src/main.store.js"
import { useMainDomNodeSetter } from "src/dom/dom.main.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { Home } from "src/home/Home.jsx"
import { Game } from "src/game/Game.jsx"
import { catchError } from "src/error/error.main.js"
import {
  UrlLoadingProvider,
  useUrlTrackerTotalCount,
  useUrlTrackerLoadedCount,
} from "src/loading/loading.main.js"
import { ImagePreloader } from "src/loading/ImagePreloader.jsx"
import { symbolSkullUrl } from "src/symbols/symbols.js"
import { Image } from "src/generic/Image.jsx"

import milleSabordsCssUrl from "../mille-sabord.css"
import loadscreenCssUrl from "../loadscreen.css"

const MainRaw = (props) => {
  return (
    <UrlLoadingProvider>
      <LoadScreen>
        <div id="main-container">
          <div id="main" ref={useMainDomNodeSetter()}>
            <Stylesheet href={milleSabordsCssUrl} />
            <AppBody {...props} />
          </div>
        </div>
      </LoadScreen>
    </UrlLoadingProvider>
  )
}

const LoadScreen = ({ children }) => {
  const loadscreenRef = React.useRef()
  const [loadscreenUrlTrackerReady, loadscreenUrlTrackerReadySetter] = React.useState(false)
  const [loadscreenUrlsLoaded, loadscreenUrlsLoadedSetter] = React.useState(false)

  // main must wait for loadscreen + request idle callback before starting
  const [mainUrlTrackerReady, mainUrlTrackerReadySetter] = React.useState(false)
  const [mainUrlsLoaded, mainsUrlsLoadedSetter] = React.useState(false)

  const urlTrackerTotalCount = useUrlTrackerTotalCount()
  const urlTrackerLoadedCount = useUrlTrackerLoadedCount()

  React.useEffect(() => {
    return requestAsapCallback(() => {
      loadscreenUrlTrackerReadySetter(true)
    })
  }, [])

  React.useEffect(() => {
    if (loadscreenUrlTrackerReady && urlTrackerLoadedCount === urlTrackerTotalCount) {
      loadscreenUrlsLoadedSetter(true)
    }
  }, [loadscreenUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount])

  React.useEffect(() => {
    if (!loadscreenUrlsLoaded) {
      return () => {}
    }

    window.splashscreen.remove()
    return requestAsapCallback(() => {
      mainUrlTrackerReadySetter(true)
    })
  }, [loadscreenUrlsLoaded])

  React.useEffect(() => {
    if (mainUrlTrackerReady && urlTrackerLoadedCount === urlTrackerTotalCount) {
      mainsUrlsLoadedSetter(true)
    }
  }, [mainUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount])

  React.useEffect(() => {
    if (mainUrlsLoaded && loadscreenRef) {
      const animation = loadscreenRef.current.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 300,
        fill: "forwards",
      })
      animation.onfinish = () => {
        loadscreenRef.current.style.display = "none"
      }
    }
  }, [loadscreenRef, mainUrlsLoaded])

  return (
    <>
      {loadscreenUrlsLoaded ? children : null}
      <div id="loadscreen" ref={loadscreenRef}>
        <Stylesheet href={loadscreenCssUrl} />
        <Image src={symbolSkullUrl} animateLoaded={false} />
        <p>
          Loading files ({urlTrackerLoadedCount}/{urlTrackerTotalCount})
        </p>
      </div>
      {mainUrlsLoaded ? <ImagePreloader /> : null}
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
