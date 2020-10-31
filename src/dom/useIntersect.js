// https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5

import React from "react"

export const useIntersect = ({ root = null, rootMargin, threshold = 0 } = {}) => {
  const [entry, entrySetter] = React.useState({})
  const [node, nodeSetter] = React.useState(null)

  const observer = React.useRef(
    new window.IntersectionObserver(([entry]) => entrySetter(entry), {
      root,
      rootMargin,
      threshold,
    }),
  )

  React.useEffect(() => {
    const currentObserver = observer.current
    currentObserver.disconnect()

    if (node) {
      currentObserver.observe(node)
    }

    return () => currentObserver.disconnect()
  }, [node])

  return [nodeSetter, entry]
}
