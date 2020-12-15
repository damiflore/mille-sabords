import React from "react"
import { addDomEventListener } from "src/dom/dom.util.js"

const UrlLoadingContext = React.createContext()
const reducer = (state, action) => action(state)
const initialState = {}

const logs = false

export const UrlLoadingProvider = ({ children }) => {
  return (
    <UrlLoadingContext.Provider value={React.useReducer(reducer, initialState)}>
      {children}
    </UrlLoadingContext.Provider>
  )
}

export const useUrlTrackerTotalCount = () => {
  const urlLoadingState = useUrlLoadingState()
  const totalCount = Object.keys(urlLoadingState).length
  return totalCount
}

export const useUrlTrackerLoadedCount = () => {
  const urlLoadingState = useUrlLoadingState()
  const loadedCount = Object.keys(urlLoadingState).filter(
    (url) => urlLoadingState[url].status === "loaded",
  ).length
  return loadedCount
}

export const useUrlTrackerAllLoaded = () => {
  const totalCount = useUrlTrackerTotalCount()
  const loadedCount = useUrlTrackerLoadedCount()
  return loadedCount === totalCount
}

export const useUrlLoadingNotifier = (url) => {
  url = String(url)

  const contextValue = React.useContext(UrlLoadingContext)
  const dispatch = contextValue ? contextValue[1] : undefined

  React.useEffect(() => {
    if (dispatch) {
      return fetchAbort
    }
    return null
  }, [])

  const fetchStart = () => {
    dispatch((state) => {
      if (url in state) {
        if (logs) {
          // console.log("start loading early return", url, state[url])
        }
        return state
      }
      if (logs) {
        console.log("start loading", url)
      }
      return {
        ...state,
        [url]: { status: "loading" },
      }
    })
  }

  const fetchAbort = () => {
    dispatch((state) => {
      if (!state.hasOwnProperty(url)) {
        return state
      }

      const status = state[url].status
      if (status !== "loading") {
        return state
      }

      if (logs) {
        console.log("abort loading", url)
      }
      const stateWithoutUrl = {}
      Object.keys(state).forEach((key) => {
        if (key !== url) {
          stateWithoutUrl[key] = state[key]
        }
      })

      return stateWithoutUrl
    })
  }

  const fetchEnd = () => {
    dispatch((state) => {
      if (url in state && state[url].status === "loaded") {
        // console.log("end loading early return", url, state[url])
        return state
      }
      if (logs) {
        console.log("end loading", url)
      }
      return {
        ...state,
        [url]: { status: "loaded" },
      }
    })
  }

  if (!contextValue) {
    // if (import.meta.dev) {
    //   console.warn(`useUrlLoadingNotifier was called on a component without UrlLoadingContext`)
    // }
    return [() => {}, () => {}, () => {}]
  }

  return [fetchStart, fetchEnd, fetchAbort]
}

export const useDOMNodeLoadingNotifier = (url) => {
  const [, domNodeFetchEnd] = useUrlLoadingNotifier(url)

  const nodeRefCallback = React.useCallback(
    (node) => {
      if (node) {
        return addLoadedListener(node, domNodeFetchEnd)
      }
      return undefined
    },
    [domNodeFetchEnd],
  )

  return nodeRefCallback
}

const useUrlLoadingState = () => {
  const contextValue = React.useContext(UrlLoadingContext)
  if (!contextValue) {
    // if (import.meta.dev) {
    //   console.warn(`useUrlLoadingState was called on a component without UrlLoadingContext`)
    // }
    return null
  }
  return contextValue[0]
}

export const useSingleUrlLoadingTracker = (url) => useUrlLoadingState()[url]

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
