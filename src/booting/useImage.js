import React from "react"
import { loadImage } from "./loadImage.js"

const cache = new Map()

export const Status = {
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed",
}

export const useImage = (src) => {
  const cachedImg = cache.get(src)
  const initialState = cachedImg ? Status.LOADED : Status.LOADING
  const [status, setStatus] = React.useState(initialState)
  const mounted = React.useRef(false)

  React.useEffect(() => {
    if (!src || status === Status.LOADED) {
      return () => {}
    }
    mounted.current = true
    ;(async () => {
      try {
        const image = await loadImage(src)
        if (!mounted.current) return

        cache.set(src, image)
        setStatus(Status.LOADED)
      } catch (error) {
        if (!mounted.current) return

        cache.delete(src)
        setStatus(Status.FAILED)
      }
    })()

    return () => {
      mounted.current = false
    }
  }, [src, status])

  return [status, cachedImg]
}
