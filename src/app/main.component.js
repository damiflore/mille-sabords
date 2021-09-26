/* eslint-disable import/max-dependencies */
import React from "react"

import { DEV } from "#env"
import { nextIDLEPromise } from "root/src/app/helper/asap.js"
import { catchError } from "root/src/app/error/error.main.js"
import {
  UrlLoadingProvider,
  useUrlTrackerTotalCount,
  useUrlTrackerLoadedCount,
} from "root/src/app/loading/loading.main.js"
import { useWaitABit } from "root/src/app/loading/loading.hooks.js"
import { Preloader } from "root/src/app/loading/Preloader.jsx"

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
  const [mainImportLoading, mainImportLoadingSetter] = React.useState(false)
  const [mainImportNamespace, mainImportNamespaceSetter] = React.useState(null)
  const [mainUrlTrackerReady, mainUrlTrackerReadySetter] = React.useState(false)
  const [mainUrlsLoaded, mainsUrlsLoadedSetter] = React.useState(false)
  const [, mainUrlErrorSetter] = React.useState()

  const urlTrackerTotalCount = useUrlTrackerTotalCount()
  const urlTrackerLoadedCount = useUrlTrackerLoadedCount()

  React.useEffect(() => {
    onLoadProgress({
      loadedCount: urlTrackerLoadedCount,
      total: urlTrackerTotalCount,
    })
  }, [mainImportLoading, urlTrackerLoadedCount, urlTrackerTotalCount])

  React.useEffect(() => {
    if (DEV) {
      performance.measure(`loading screen displayed`)
    }
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

    mainImportLoadingSetter(true)
    ;(async () => {
      try {
        const namespace = await import("./App.jsx")
        mainImportLoadingSetter(false)
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
