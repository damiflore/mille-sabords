/* eslint-disable import/max-dependencies */
import React from "react"
import { requestAsapCallback } from "src/helper/asap.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { catchError } from "src/error/error.main.js"
import {
  UrlLoadingProvider,
  useUrlTrackerTotalCount,
  useUrlTrackerLoadedCount,
} from "src/loading/loading.main.js"
import { useWaitABit } from "src/loading/loading.hooks.js"
import { Preloader } from "src/loading/Preloader.jsx"
import { symbolSkullUrl } from "src/symbols/symbols.js"
import { Image } from "src/generic/Image.jsx"

import loadscreenCssUrl from "../loadscreen.css"

const MainRaw = (props) => {
  return (
    <UrlLoadingProvider>
      <LoadScreen {...props}></LoadScreen>
    </UrlLoadingProvider>
  )
}

const LoadScreen = (props) => {
  const loadscreenRef = React.useRef()
  const loadscreenUrlTrackerReady = useWaitABit()
  const [loadscreenUrlsLoaded, loadscreenUrlsLoadedSetter] = React.useState(false)

  // main must wait for loadscreen + request idle callback before starting
  const [mainImportLoading, mainImportLoadingSetter] = React.useState(false)
  const [mainImportNamespace, mainImportNamespaceSetter] = React.useState(null)
  const [mainUrlTrackerReady, mainUrlTrackerReadySetter] = React.useState(false)
  const [mainUrlsLoaded, mainsUrlsLoadedSetter] = React.useState(false)
  const [, mainUrlErrorSetter] = React.useState()

  const urlTrackerTotalCount = useUrlTrackerTotalCount()
  const urlTrackerLoadedCount = useUrlTrackerLoadedCount()

  React.useEffect(() => {
    if (loadscreenUrlTrackerReady && urlTrackerLoadedCount === urlTrackerTotalCount) {
      loadscreenUrlsLoadedSetter(true)
    }
  }, [loadscreenUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount])

  React.useEffect(() => {
    if (!loadscreenUrlsLoaded) {
      return
    }

    window.splashscreen.remove()

    mainImportLoadingSetter(true)
    ;(async () => {
      try {
        const namespace = await import("./App.jsx")
        mainImportLoadingSetter(false)
        mainImportNamespaceSetter(namespace)
        requestAsapCallback(() => {
          mainUrlTrackerReadySetter(true)
        })
      } catch (e) {
        // https://github.com/facebook/react/issues/14981
        mainUrlErrorSetter(() => {
          throw e
        })
      }
    })()
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
      {mainImportNamespace ? <mainImportNamespace.App {...props} /> : null}
      <div id="loadscreen" ref={loadscreenRef}>
        <Stylesheet href={loadscreenCssUrl} />
        <Image src={symbolSkullUrl} animateLoaded={false} />
        {mainImportLoading ? (
          <p className="text">Chargement du jeu...</p>
        ) : (
          <>
            <p className="text">Chargement du jeu...</p>
            <div className="progress">
              {urlTrackerLoadedCount}/{urlTrackerTotalCount}
            </div>
          </>
        )}
      </div>
      {mainUrlsLoaded ? <Preloader /> : null}
    </>
  )
}

const ErrorScreen = ({ error }) => {
  window.splashscreen.remove()
  return (
    <div style={{ maxWidth: "100vw" }}>
      <div style={{ margin: "10px 15px" }}>An error occured</div>
      <pre style={{ overflow: "auto", margin: "10px 15px" }}>
        {typeof error === "object" ? error.stack : error}
      </pre>
    </div>
  )
}

export const Main = catchError(MainRaw, ErrorScreen)
