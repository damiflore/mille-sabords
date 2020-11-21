import React from "react"

import { useUrlLoadingNotifier } from "src/loading/loading.main.js"
import { useImage } from "src/loading/useImage.js"
import { OnceIntersectingSuspense } from "./OnceIntersectingSuspense.js"

export const Image = ({
  loadWhenIntersecting = true,
  // lorsque l'image est déja loadée il en faudrait pas attendre qu'elle soit intersectedpour pour utiliser le bon SRC
  // dans ce cas, mettre ce paramètre à false dans le cas ou un utilise une image pour la seconde fois (ou plus)
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
  const [status] = useImageStatusHook(src)
  const [imageFetchEnd] = useUrlLoadingNotifier(src)
  React.useEffect(() => {
    if (status === "loaded") {
      imageFetchEnd()
    }
  }, [status])

  let Component = <img src={src} {...props} />

  if (animateLoaded) {
    Component = <AnimateImageLoaded status={status} src={src} imageProps={props} />
  }

  if (usePlaceholderWhileLoading) {
    const ComponentPrevious = Component
    Component = (
      <OnceImageLoadedSuspense status={status} fallback={<FallbackWhileLoading {...props} />}>
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

const AnimateImageLoaded = ({ status, src, imageProps }) => {
  const mountedRef = React.useRef(false)
  const nodeRef = React.useRef()
  const statusRef = React.useRef(status)

  React.useLayoutEffect(() => {
    const mounted = mountedRef.current
    const node = nodeRef.current
    const statusPrevious = statusRef.current
    mountedRef.current = true
    statusRef.current = status

    // ça ne marche pas vraiment parce que ce composant est mount
    // que lorsque l'image est load et du coup il n'y aura pas d'animation
    // mais bon quelque part l'image étant déja loadé il n'y a pas d'animation
    // et c'est ce qu'on veut
    if (mounted && statusPrevious !== status && status === "loaded") {
      const opacity = window.getComputedStyle(node).getPropertyValue("opacity")
      node.animate([{ opacity: 0 }, { opacity }], {
        duration: 300,
      })
    }
  }, [status, nodeRef])

  return <img ref={nodeRef} src={src} {...imageProps} />
}

const OnceImageLoadedSuspense = ({ fallback, status, children }) => {
  if (status !== "loaded") {
    return fallback
  }
  return children
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
