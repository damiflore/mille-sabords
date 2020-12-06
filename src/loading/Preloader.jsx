/* eslint-disable import/max-dependencies */
import React from "react"
import { registerServiceWorker } from "@jsenv/pwa"

import { cardDefaultUrl, cardImageUrlMap } from "src/cards/cards.js"

import woodUrl from "src/wood.jpg"
import pirateHookUrl from "src/chest/pirate-hook.png"
import pirateHook2Url from "src/chest/pirate-hook-02.png"
import woodBoxUrl from "src/chest/wood-box.jpg"
import treasureMapUrl from "src/dice-ongoing/treasure-map.png"
import witchLabelUrl from "src/skull-island/witch-label.png"
import skullBottleUrl from "src/skull-island/skull-bottle.png"
import { preloadImages } from "src/loading/preloadImages.js"
import { useWaitABit } from "./loading.hooks.js"

export const Preloader = () => {
  const waited = useWaitABit()

  React.useEffect(() => {
    if (waited) {
      registerServiceWorker("/service-worker.js")
    }
  }, [waited])

  return waited ? <ImagePreloader /> : null
}

const ImagePreloader = () => {
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
