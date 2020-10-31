import React from "react"

export const OnceIntersectingSuspense = ({
  fallback,
  root,
  rootMargin,
  threshold = 0,
  children,
}) => {
  const [isIntersecting, isIntersectingSetter] = React.useState(false)
  const [node, nodeSetter] = React.useState(null)

  React.useEffect(() => {
    if (!node) {
      return () => {}
    }
    if (isIntersecting) {
      return () => {}
    }

    // https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(node)
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
    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [node, isIntersecting])

  if (!isIntersecting) {
    return fallback({ ref: nodeSetter })
  }

  return <>{children}</>
}
