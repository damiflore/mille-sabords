import React from "react"

import { cardList } from "src/cards/cards.js"
import { Image } from "src/generic/Image.jsx"

export const PreloadImages = () => {
  const images = [
    "/src/wood.jpg",
    `/src/chest/pirate-hook.png`,
    `/src/chest/pirate-hook-02.png`,
    "/src/chest/wood-box.jpg",
    "/src/dice-ongoing/treasure-map.png",
    "/src/skull-island/witch-label.png",
    "/src/skull-island/skull-bottle.png",
    `/src/cards/card_default.png`,
    ...cardList.map((card) => `/src/cards/card_${card}.png`),
  ]

  return (
    <div style={{ display: "none" }}>
      {images.map((src) => (
        <Image key={src} src={src} />
      ))}
    </div>
  )
}
