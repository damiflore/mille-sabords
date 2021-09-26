import React from "react"
import { addToHomescreen } from "@jsenv/pwa"

export const useAddToHomescreen = () => {
  const available = useAddToHomescreenAvailable()
  const prompt = useAddToHomescreenPrompt()
  return [available, prompt]
}

const useAddToHomescreenAvailable = () => {
  const [addToHomescreenAvailable, addToHomescreenAvailableSetter] =
    React.useState()

  React.useEffect(() => {
    return addToHomescreen.listenAvailabilityChange(() => {
      addToHomescreenAvailableSetter(addToHomescreen.isAvailable())
    })
  }, [])

  return addToHomescreenAvailable
}

const useAddToHomescreenPrompt = () => {
  return React.useCallback(addToHomescreen.prompt)
}
