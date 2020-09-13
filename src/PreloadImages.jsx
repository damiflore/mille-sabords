import React from "react"

import { useRessourceTracker } from "src/game.store.js"
import { cardList } from "src/cards/cards.js"
import { addDomEventListener } from "src/dom/dom.js"

export const PreloadImages = () => {
  const images = [
    "src/wood.jpg",
    `src/chest/pirate-hook.png`,
    `src/chest/pirate-hook-02.png`,
    "src/chest/wood-box.jpg",
    "src/dice-ongoing/treasure-map.png",
    "src/skull-island/witch-label.png",
    "src/skull-island/skull-bottle.png",
    `src/cards/card_default.png`,
    ...cardList.map((card) => `src/cards/card_${card}.png`),
  ]

  return (
    <div style={{ display: "none" }}>
      {images.map((src) => (
        <GameImage key={src} src={src} />
      ))}
    </div>
  )
}

const GameImage = ({ ref, src, ...props }) => {
  const endLoadingRessource = useRessourceTracker(src)

  const nodeRef = (domNode) => {
    if (!domNode) return () => {}

    if (domNode.complete) {
      endLoadingRessource()
      return () => {}
    }
    return addDomEventListener(domNode, "load", endLoadingRessource)
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
