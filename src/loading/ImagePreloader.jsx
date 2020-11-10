import React from "react"

import { cardDefaultUrl, cardImageUrlMap } from "src/cards/cards.js"

import woodUrl from "src/wood.jpg"
import pirateHookUrl from "src/chest/pirate-hook.png"
import pirateHook2Url from "src/chest/pirate-hook-02.png"
import woodBoxUrl from "src/chest/wood-box.jpg"
import treasureMapUrl from "src/dice-ongoing/treasure-map.png"
import witchLabelUrl from "src/skull-island/witch-label.png"
import skullBottleUrl from "src/skull-island/skull-bottle.png"
import { preloadImages } from "src/loading/preloadImages.js"

export const ImagePreloader = () => {
  const images = [
    woodUrl,
    pirateHookUrl,
    pirateHook2Url,
    woodBoxUrl,
    treasureMapUrl,
    witchLabelUrl,
    skullBottleUrl,
    cardDefaultUrl,
    ...Object.keys(cardImageUrlMap).map((key) => cardImageUrlMap[key]),
  ]

  React.useEffect(() => {
    const timeoutId = setTimeout(() => preloadImages(images), 2000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return null
}
