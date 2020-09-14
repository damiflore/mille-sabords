import React from "react"
import { addDomEventListener } from "src/dom/dom.js"

const { createContext, useContext } = React

export const Booting = ({ onBoot, children }) => {
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
      return
    }

    const allLoaded = Object.keys(assetsTracking).every(
      (url) => assetsTracking[url].status === "loaded",
    )
    // console.log("ressource tracked", Object.keys(assetsTracking), allLoaded, assetsTracking)
    if (allLoaded) {
      setTimeout(
        () => {
          // console.info(`all game ressource loaded`, Object.keys(assetsTracking))
          onBoot()
        },
        // give bit of time for the browser to render stuff
        50,
      )
    }
  }, [bootAssetTracking, assetsTracking])

  return <>{children}</>
}

const AssetsContext = createContext()

export const useAssetsTracking = () => useContext(AssetsContext)[0]

export const useAssetTracking = (url) => useContext(AssetsContext)[0][url]

export const useAssetTracker = (url) => {
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

const assetTrackingReducer = (state, action) => action(state)
const assetTrackingInitialState = {}

export const AssetsTrackingProvider = ({ children }) => {
  return (
    <AssetsContext.Provider
      value={React.useReducer(assetTrackingReducer, assetTrackingInitialState)}
    >
      {children}
    </AssetsContext.Provider>
  )
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
