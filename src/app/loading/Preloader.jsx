import React from "react"

import { serviceWorkerScript } from "/src/service_worker_script.js"
import { cardDefaultUrl, cardImageUrlMap } from "/src/app/cards/cards.js"
import { preloadImages } from "/src/app/loading/preloadImages.js"

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
    if (waited && serviceWorkerScript) {
      serviceWorkerScript.setRegistrationPromise(
        window.navigator.serviceWorker.register(
          new URL("/src/service_worker.js", import.meta.url),
          {
            type: "module",
          },
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
