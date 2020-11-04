import React from "react"
import { addDomEventListener } from "src/dom/dom.util.js"

const { createContext, useContext, useReducer, useState } = React

export const watchLoading = (LowerLevelComponent) => {
  const Loading = (props) => {
    // fake the loading of some ressource to ensure
    // other components had time to register their own asset tracking
    const assetLoadEnds = useAssetTracker("")
    React.useEffect(() => {
      assetLoadEnds()
    }, [])

    const bootAssetTracking = useAssetTracking("")
    const assetsTracking = useAssetsTracking()
    React.useEffect(() => {
      if (!bootAssetTracking) {
        return () => {}
      }

      const allLoaded = Object.keys(assetsTracking).every(
        (url) => assetsTracking[url].status === "loaded",
      )
      // console.log("ressource tracked", Object.keys(assetsTracking), allLoaded, assetsTracking)
      if (allLoaded) {
        // give bit of time for the browser to render stuff
        const callbackRequestId = window.requestIdleCallback(
          () => {
            props.bootedSetter(true)
            // console.info(`all game ressource loaded`, Object.keys(assetsTracking))
          },

          { timeout: 400 },
        )
        return () => {
          window.cancelIdleCallback(callbackRequestId)
        }
      }
      return () => {}
    }, [bootAssetTracking, assetsTracking])

    return <LowerLevelComponent {...props} />
  }

  const LoadingWithAssetTrackingProvider = (props) => {
    const [booted, bootedSetter] = useState(false)

    return (
      <AssetsTrackingProvider>
        <Loading {...props} booted={booted} bootedSetter={bootedSetter} />
      </AssetsTrackingProvider>
    )
  }

  return LoadingWithAssetTrackingProvider
}

const AssetsContext = createContext()
const assetTrackingReducer = (state, action) => action(state)
const assetTrackingInitialState = {}

const AssetsTrackingProvider = ({ children }) => {
  return (
    <AssetsContext.Provider value={useReducer(assetTrackingReducer, assetTrackingInitialState)}>
      {children}
    </AssetsContext.Provider>
  )
}

export const useAssetsTracking = () => useContext(AssetsContext)[0]

export const useAssetTracking = (url) => useContext(AssetsContext)[0][url]

export const useAssetTracker = (url) => {
  const assetContextValue = useContext(AssetsContext)
  if (!assetContextValue) {
    // this asset has not the assetsContext, it cannot be tracked
    return () => {}
  }

  const dispatch = useContext(AssetsContext)[1]

  const assetLoadStarts = () => {
    dispatch((state) => {
      if (url in state) {
        // console.log("start loading early return", url, state[url])
        return state
      }
      // console.log("start loading", url)
      return {
        ...state,
        [url]: { status: "loading" },
      }
    })
  }

  const assetLoadEnds = () => {
    dispatch((state) => {
      if (url in state && state[url].status === "loaded") {
        // console.log("end loading early return", url, state[url])
        return state
      }
      // console.log("end loading", url)
      return {
        ...state,
        [url]: { status: "loaded" },
      }
    })
  }

  React.useEffect(() => {
    assetLoadStarts()
  }, [])

  return assetLoadEnds
}

export const addLoadedListener = (domNode, callback) => {
  const removeLoadListener = addDomEventListener(domNode, "load", () => {
    removeErrorListener()
    callback()
  })
  const removeErrorListener = addDomEventListener(domNode, "error", () => {
    removeLoadListener()
    callback()
  })

  return () => {
    removeLoadListener()
    removeErrorListener()
  }
}
