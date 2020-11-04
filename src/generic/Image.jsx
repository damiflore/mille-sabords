import React from "react"

import { useAssetTracker } from "src/loading/loading.main.js"
import { useImage } from "src/loading/useImage.js"
import { OnceIntersectingSuspense } from "./OnceIntersectingSuspense.js"

export const Image = ({
  loadWhenIntersecting = true,
  usePlaceholderWhileLoading = true,

  intersectionRoot,
  intersectionRootMargin,
  intersectionThreshold,
  FallbackWhileNotIntersecting = ImageNotIntersectingFallback,
  FallbackWhileLoading = ImageLoadingFallback,
  src,
  ...props
}) => {
  let Component = <AnimateImageLoaded {...props} src={src} />

  if (usePlaceholderWhileLoading) {
    const ComponentPrevious = Component
    Component = (
      <OnceImageLoadedSuspense src={src} fallback={<FallbackWhileLoading {...props} />}>
        {ComponentPrevious}
      </OnceImageLoadedSuspense>
    )
  }

  if (loadWhenIntersecting) {
    const ComponentPrevious = Component
    Component = (
      <OnceIntersectingSuspense
        fallback={({ ref }) => <FallbackWhileNotIntersecting ref={ref} {...props} />}
        root={intersectionRoot}
        rootMargin={intersectionRootMargin}
        threshold={intersectionThreshold}
      >
        {ComponentPrevious}
      </OnceIntersectingSuspense>
    )
  }

  return Component
}

const AnimateImageLoaded = (props) => {
  const nodeRef = React.useRef()
  React.useEffect(() => {
    nodeRef.current.animate(
      [
        { transform: "scale(0)", opacity: 0 },
        { transform: "scale(1)", opacity: 1 },
      ],
      {
        duration: 300,
        fill: "forwards",
      },
    )
  }, [nodeRef])
  return <img {...props} ref={nodeRef} />
}

const OnceImageLoadedSuspense = ({ fallback, src, children }) => {
  const [status] = useImage(src)
  const imageLoadEnds = useAssetTracker(src)

  React.useEffect(() => {
    if (status === "loaded") {
      imageLoadEnds()
    }
  }, [status])

  if (status !== "loaded") {
    return fallback
  }

  return children
}

// eslint-disable-next-line react/display-name
const ImageLoadingFallback = React.forwardRef((props, ref) => {
  return <img src={TRANSPARENT_PNG_DATA_URL} {...props} ref={ref} />
})

// eslint-disable-next-line react/display-name
const ImageNotIntersectingFallback = React.forwardRef((props, ref) => {
  return <img src={TRANSPARENT_PNG_DATA_URL} {...props} ref={ref} />
})

const TRANSPARENT_PNG_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
