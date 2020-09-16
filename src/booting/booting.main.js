import React from "react"
import { addDomEventListener } from "src/dom/dom.util.js"

const { createContext, useContext, useReducer } = React

export const watchBooting = (LowerLevelComponent, onBoot) => {
  const Booting = (props) => {
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

    return <LowerLevelComponent {...props} />
  }

  const BootingWithAssetTrackingProvider = () => {
    return (
      <AssetsTrackingProvider>
        <Booting />
      </AssetsTrackingProvider>
    )
  }

  return BootingWithAssetTrackingProvider
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