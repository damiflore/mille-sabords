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
import { ImagePreloader } from "src/loading/ImagePreloader.jsx"
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
  const [loadscreenUrlTrackerReady, loadscreenUrlTrackerReadySetter] = React.useState(false)
  const [loadscreenUrlsLoaded, loadscreenUrlsLoadedSetter] = React.useState(false)

  // main must wait for loadscreen + request idle callback before starting
  const [mainImportLoading, mainImportLoadingSetter] = React.useState(false)
  const [mainImportNamespace, mainImportNamespaceSetter] = React.useState(null)
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
      return
    }

    window.splashscreen.remove()

    mainImportLoadingSetter(true)
    ;(async () => {
      // TODO: try/catch
      const namespace = await import("./App.jsx")
      mainImportLoadingSetter(false)
      mainImportNamespaceSetter(namespace)
      requestAsapCallback(() => {
        mainUrlTrackerReadySetter(true)
      })
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
          <p>Chargement du jeu</p>
        ) : (
          <p>
            Chargement de fichiers ({urlTrackerLoadedCount}/{urlTrackerTotalCount})
          </p>
        )}
      </div>
      {mainUrlsLoaded ? <ImagePreloader /> : null}
    </>
  )
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
