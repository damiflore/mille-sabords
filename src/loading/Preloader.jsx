/* eslint-disable import/max-dependencies */
import React from "react"
import { registerServiceWorker } from "@jsenv/pwa"

import { cardDefaultUrl, cardImageUrlMap } from "src/cards/cards.js"
import { preloadImages } from "src/loading/preloadImages.js"
import { useWaitABit } from "./loading.hooks.js"

const woodUrl = new URL("/src/wood.jpg", import.meta.url)
const pirateHookUrl = new URL("/src/chest/pirate-hook.png", import.meta.url)
const pirateHook2Url = new URL("/src/chest/pirate-hook-02.png", import.meta.url)
const woodBoxUrl = new URL("/src/chest/wood-box.jpg", import.meta.url)
const treasureMapUrl = new URL(
  "/src/dice-ongoing/treasure-map.png",
  import.meta.url,
)
const witchLabelUrl = new URL(
  "/src/skull-island/witch-label.png",
  import.meta.url,
)
const skullBottleUrl = new URL(
  "/src/skull-island/skull-bottle.png",
  import.meta.url,
)

export const Preloader = () => {
  const waited = useWaitABit()

  React.useEffect(() => {
    if (waited) {
      registerServiceWorker("/service_worker.js")
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
