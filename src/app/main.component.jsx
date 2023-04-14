/*
 * Ideally this file should be renamed into something like loadscreen
 * and should be decoupled from rendering the game
 */

import React from "react"

import { nextIDLEPromise } from "/app/helper/asap.js"
import { catchError } from "/app/error/error.main.jsx"
import {
  UrlLoadingProvider,
  useUrlTrackerTotalCount,
  useUrlTrackerLoadedCount,
} from "/app/loading/loading.main.jsx"
import { useWaitABit } from "/app/loading/loading.hooks.js"
import { Preloader } from "/app/loading/Preloader.jsx"

const MainRaw = ({ error, onError, ...props }) => {
  if (error) {
    return <ErrorScreen error={error} onError={onError} />
  }

  return (
    <UrlLoadingProvider>
      <LoadScreen {...props}></LoadScreen>
    </UrlLoadingProvider>
  )
}

const ErrorScreen = ({ error, onError }) => {
  React.useEffect(() => {
    onError(error)
  }, [])

  return (
    <div style={{ maxWidth: "100vw" }}>
      <div style={{ margin: "10px 15px" }}>An error occured</div>
      <pre style={{ overflow: "auto", margin: "10px 15px" }}>
        {typeof error === "object" ? error.stack : error}
      </pre>
    </div>
  )
}

const LoadScreen = ({ rootNode, onLoadProgress, onReady, ...props }) => {
  const loadscreenUrlTrackerReady = useWaitABit()
  const [loadscreenUrlsLoaded, loadscreenUrlsLoadedSetter] =
    React.useState(false)

  // main must wait for loadscreen + request idle callback before starting
  const [mainImportNamespace, mainImportNamespaceSetter] = React.useState(null)
  const [mainUrlTrackerReady, mainUrlTrackerReadySetter] = React.useState(false)
  const [mainUrlsLoaded, mainsUrlsLoadedSetter] = React.useState(false)
  const [, mainUrlErrorSetter] = React.useState()

  const urlTrackerTotalCount = useUrlTrackerTotalCount()
  const urlTrackerLoadedCount = useUrlTrackerLoadedCount()

  React.useEffect(() => {
    if (mainUrlTrackerReady) {
      onLoadProgress({
        loadedCount: urlTrackerLoadedCount,
        total: urlTrackerTotalCount,
      })
    }
  }, [mainUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount])

  React.useEffect(() => {
    performance.measure(`loading screen displayed`)
    rootNode.querySelector(`#main-container`).setAttribute("data-loading", "")
  }, [])

  React.useEffect(() => {
    if (mainUrlsLoaded) {
      rootNode.querySelector(`#main-container`).removeAttribute("data-loading")
    }
  }, [mainUrlsLoaded])

  React.useEffect(() => {
    if (
      loadscreenUrlTrackerReady &&
      urlTrackerLoadedCount === urlTrackerTotalCount
    ) {
      loadscreenUrlsLoadedSetter(true)
    }
  }, [loadscreenUrlTrackerReady, urlTrackerLoadedCount, urlTrackerTotalCount])

  React.useEffect(() => {
    if (!loadscreenUrlsLoaded) {
      return
    }

    ;(async () => {
      try {
        const namespace = await import("./root.jsx")
        mainImportNamespaceSetter(namespace)
        await nextIDLEPromise()
        mainUrlTrackerReadySetter(true)
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
    if (mainUrlsLoaded) {
      onReady()
    }
  }, [mainUrlsLoaded])

  return (
    <>
      <div id="main-container">
        {mainImportNamespace ? <mainImportNamespace.App {...props} /> : null}
      </div>
      {mainUrlsLoaded ? <Preloader /> : null}
    </>
  )
}

export const Main = catchError(MainRaw)
