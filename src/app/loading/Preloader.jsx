import React from "react"

import { swFacade } from "/service_worker_facade.js"
import { cardDefaultUrl, cardImageUrlMap } from "/app/cards/cards.js"
import { preloadImages } from "/app/loading/preloadImages.js"

import { useWaitABit } from "./loading.hooks.js"

const woodUrl = new URL("../wood.jpg", import.meta.url)
const pirateHookUrl = new URL("../chest/pirate-hook.png", import.meta.url)
const pirateHook2Url = new URL("../chest/pirate-hook-02.png", import.meta.url)
const woodBoxUrl = new URL("../chest/wood-box.jpg", import.meta.url)
const treasureMapUrl = new URL(
  "../dice-ongoing/treasure-map.png",
  import.meta.url,
)
const witchLabelUrl = new URL(
  "../skull-island/witch-label.png",
  import.meta.url,
)
const skullBottleUrl = new URL(
  "../skull-island/skull-bottle.png",
  import.meta.url,
)

export const Preloader = () => {
  const waited = useWaitABit()

  React.useEffect(() => {
    if (waited && swFacade) {
      swFacade.setRegistrationPromise(
        window.navigator.serviceWorker.register(
          new URL("/service_worker.js", import.meta.url),
        ),
      )
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
