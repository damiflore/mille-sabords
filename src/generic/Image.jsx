import React from "react"

import { useUrlLoadingNotifier } from "src/loading/loading.main.js"
import { useImage } from "src/loading/useImage.js"
import { usePrevious } from "../hooks.js"
import { useIntersecting } from "./useIntersecting.js"

export const Image = ({
  loadWhenIntersecting = true,
  usePlaceholderWhileLoading = true,
  animateLoaded = true,

  intersectionRoot,
  intersectionRootMargin,
  intersectionThreshold,
  FallbackWhileNotIntersecting = ImageNotIntersectingFallback,
  FallbackWhileLoading = ImageLoadingFallback,
  useImageStatusHook = useImage,

  src,
  ...props
}) => {
  const [status, startLoadingImage] = useImageStatusHook(src, { lazy: loadWhenIntersecting })
  const statusPrevious = usePrevious(status)

  const [imageFetchStart, imageFetchEnd] = useUrlLoadingNotifier(src)
  React.useEffect(() => {
    if (statusPrevious !== "loading" && status === "loading") {
      imageFetchStart()
    }
    if (statusPrevious !== "loaded" && status === "loaded") {
      imageFetchEnd()
    }
  }, [statusPrevious, status])

  const [domNodeRefForIntersection, intersecting] = useIntersecting({
    root: intersectionRoot,
    rootMargin: intersectionRootMargin,
    threshold: intersectionThreshold,
  })

  const intersectingPrevious = usePrevious(intersecting)
  React.useEffect(() => {
    // console.log({ src, loadWhenIntersecting, intersectingPrevious, intersecting })
    if (loadWhenIntersecting && !intersectingPrevious && intersecting) {
      // console.log("start loading", String(src))
      startLoadingImage()
    }
  }, [loadWhenIntersecting, intersectingPrevious, intersecting])

  const [domNodeRefForAnimation, startAnimation] = useImageLoadAnimation()
  React.useLayoutEffect(() => {
    if (animateLoaded && statusPrevious !== "loaded" && status === "loaded") {
      startAnimation()
    }
  }, [animateLoaded, statusPrevious, status])

  if (loadWhenIntersecting && status !== "loaded" && !intersecting) {
    return <FallbackWhileNotIntersecting ref={domNodeRefForIntersection} />
  }

  if (usePlaceholderWhileLoading && status !== "loaded") {
    return <FallbackWhileLoading />
  }

  return <img src={src} ref={domNodeRefForAnimation} {...props} />
}

const useImageLoadAnimation = () => {
  const domNodeRef = React.useRef()

  const startAnimation = React.useCallback(() => {
    const domNode = domNodeRef.current
    const opacity = window.getComputedStyle(domNode).getPropertyValue("opacity")
    domNode.animate([{ opacity: 0 }, { opacity }], {
      duration: 300,
    })
  })

  return [domNodeRef, startAnimation]
}

// eslint-disable-next-line react/display-name
const ImageLoadingFallback = React.forwardRef((props, ref) => {
  return <img src={TRANSPARENT_PNG_DATA_URL} ref={ref} {...props} />
})

// eslint-disable-next-line react/display-name
const ImageNotIntersectingFallback = React.forwardRef((props, ref) => {
  return <img src={TRANSPARENT_PNG_DATA_URL} ref={ref} {...props} />
})

const TRANSPARENT_PNG_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
