import React from "react"
import { addDomEventListener } from "src/dom/dom.util.js"

const UrlLoadingContext = React.createContext()
const reducer = (state, action) => action(state)
const initialState = {}

export const UrlLoadingProvider = ({ children }) => {
  return (
    <UrlLoadingContext.Provider value={React.useReducer(reducer, initialState)}>
      {children}
    </UrlLoadingContext.Provider>
  )
}

export const useUrlTracking = () => {
  const urlLoadingState = useUrlLoadingState()
  const fakeUrlLoadends = useUrlLoadingNotifier("")
  const fakeUrlLoadingTracker = useSingleUrlLoadingTracker("")

  const [urlTrackingReady, urlTrackingReadySetter] = React.useState(false)
  const [urlTotalCount, urlTotalCountSetter] = React.useState(0)
  const [urlLoadedCount, urlLoadedCountSetter] = React.useState(0)
  const [urlAllLoaded, urlAllLoadedSetter] = React.useState(true)

  // wait a first fake url load ends to ensure other components are rendered
  // once and capable to call useUrlLoadingNotifier() informing us
  // that something is loading an url.
  React.useEffect(() => {
    fakeUrlLoadends()
  }, [])

  React.useEffect(() => {
    if (fakeUrlLoadingTracker && fakeUrlLoadingTracker.status === "loaded") {
      urlTrackingReadySetter(true)
    }
  }, [fakeUrlLoadingTracker])

  React.useEffect(() => {
    if (!urlTrackingReady) {
      return
    }

    const urls = Object.keys(urlLoadingState)
    const totalCount = urls.length
    const loadedCount = urls.filter((url) => urlLoadingState[url].status === "loaded").length
    const allLoaded = loadedCount === urlTotalCount

    urlTotalCountSetter(totalCount)
    urlLoadedCountSetter(loadedCount)
    urlAllLoadedSetter(allLoaded)
  }, [urlTrackingReady, urlLoadingState])

  return {
    urlTrackingReady,
    urlTotalCount,
    urlLoadedCount,
    urlAllLoaded,
  }
}

export const useUrlLoadingNotifier = (url) => {
  const contextValue = React.useContext(UrlLoadingContext)
  if (!contextValue) {
    if (import.meta.dev) {
      console.warn(`useUrlLoadingNotifier was called on a component without UrlLoadingContext`)
    }
    return () => {}
  }

  const dispatch = contextValue[1]

  const loadStarts = () => {
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

  const loadEnds = () => {
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
    loadStarts()
  }, [])

  return loadEnds
}

export const useDOMNodeLoadingNotifier = (url) => {
  const loadEnds = useUrlLoadingNotifier(url)

  const nodeRefCallback = (node) => {
    if (node) {
      addLoadedListener(node, loadEnds)
    }
  }

  return nodeRefCallback
}

const useUrlLoadingState = () => {
  const contextValue = React.useContext(UrlLoadingContext)
  if (!contextValue) {
    if (import.meta.dev) {
      console.warn(`useUrlLoadingState was called on a component without UrlLoadingContext`)
    }
    return null
  }
  return contextValue[0]
}

export const useSingleUrlLoadingTracker = (url) => useUrlLoadingState()[url]

const addLoadedListener = (domNode, callback) => {
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
