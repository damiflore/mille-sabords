import React from "react"

import { loadImage } from "./loadImage.js"

const cache = new Map()

export const Status = {
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed",
}

export const useImage = (src, { lazy = false } = {}) => {
  const cacheEntry = cache.get(src)
  const statusInitial = cacheEntry ? Status.LOADED : Status.LOADING
  const [status, setStatus] = React.useState(statusInitial)

  const mounted = React.useRef(false)
  React.useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const startLoading = React.useCallback(async () => {
    if (status === Status.LOADED) {
      return
    }

    try {
      const image = await loadImage(src)

      if (!mounted.current) {
        // don't call setState on unmounted component
        console.log("image unmounted")
        return
      }
      cache.set(src, image)
      setStatus(Status.LOADED)
    } catch (error) {
      if (!mounted.current) {
        // don't call setState on unmounted component
        return
      }
      cache.delete(src)
      setStatus(Status.FAILED)
    }
  }, [setStatus, src])

  React.useEffect(() => {
    if (!lazy) {
      startLoading()
    }
  }, [lazy])

  return [status, startLoading]
}
