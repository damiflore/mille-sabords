import React from "react"

import { useRessourceTracker } from "src/game.store.js"
import { cardList } from "src/cards/cards.js"
import { addDomEventListener } from "src/dom/dom.js"

export const PreloadImages = () => {
  return (
    <div style={{ display: "none" }}>
      <GameImage src={`src/skull-island/witch-label.png`} />
      <GameImage src={`src/chest/pirate-hook.png`} />
      <GameImage src={`src/chest/pirate-hook-02.png`} />
      <GameImage src={`src/cards/card_default.png`} />
      {cardList.map((card) => {
        return <GameImage src={`src/cards/card_${card}.png`} alt={card} key={card} />
      })}
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
