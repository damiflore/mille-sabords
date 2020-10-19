import React from "react"

import { cardDefaultUrl, cardImageUrlMap } from "src/cards/cards.js"
import { Image } from "src/generic/Image.jsx"

import woodUrl from "src/wood.jpg"
import pirateHookUrl from "src/chest/pirate-hook.png"
import pirateHook2Url from "src/chest/pirate-hook-02.png"
import woodBoxUrl from "src/chest/wood-box.jpg"
import treasureMapUrl from "src/dice-ongoing/treasure-map.png"
import witchLabelUrl from "src/skull-island/witch-label.png"
import skullBottleUrl from "src/skull-island/skull-bottle.png"

export const PreloadImages = () => {
  const images = [
    woodUrl,
    pirateHookUrl,
    pirateHook2Url,
    woodBoxUrl,
    treasureMapUrl,
    witchLabelUrl,
    skullBottleUrl,
    cardDefaultUrl,
    Object.keys(cardImageUrlMap).map((key) => cardImageUrlMap[key]),
  ]
  console.log(images)

  return (
    <div style={{ display: "none" }}>
      {images.map((src) => (
        <Image key={src} src={src} />
      ))}
    </div>
  )
}
