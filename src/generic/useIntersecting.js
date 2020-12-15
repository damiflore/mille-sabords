import React from "react"

export const useIntersecting = ({ root, rootMargin, threshold = 0 }) => {
  const [isIntersecting, isIntersectingSetter] = React.useState(false)
  const domNodeRef = React.useRef()

  React.useEffect(() => {
    const domNode = domNodeRef.current
    if (!domNode) {
      return null
    }
    if (isIntersecting) {
      return null
    }

    // https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(domNode)
          isIntersectingSetter(true)
        } else {
          isIntersectingSetter(false)
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    )
    observer.observe(domNode)

    return () => {
      observer.disconnect()
    }
  }, [isIntersecting])

  return [domNodeRef, isIntersecting]
}
