import React from "react"

import { useAssetTracker, addLoadedListener } from "src/booting/booting.main.js"

export const Image = ({ ref, src, ...props }) => {
  const imageLoadEnds = useAssetTracker(src)

  const nodeRef = (domNode) => {
    if (!domNode) return () => {}

    if (domNode.complete) {
      imageLoadEnds()
      return () => {}
    }

    return addLoadedListener(domNode, imageLoadEnds)
  }

  if (ref) {
    const oldRef = ref
    ref = (node) => {
      oldRef(node)
      nodeRef(node)
    }
  } else {
    ref = nodeRef
  }

  return <img {...props} src={src} ref={ref} />
}
