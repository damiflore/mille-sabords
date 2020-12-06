import React from "react"
import { listenAddToHomescreenAvailable, promptAddToHomescreen } from "@jsenv/pwa"

export const useAddToHomescreen = () => {
  const available = useAddToHomescreenAvailable()
  const prompt = useAddToHomescreenPrompt()
  return [available, prompt]
}

const useAddToHomescreenAvailable = () => {
  const [addToHomescreenAvailable, addToHomescreenAvailableSetter] = React.useState()

  React.useEffect(() => {
    return listenAddToHomescreenAvailable(addToHomescreenAvailableSetter)
  }, [])

  return addToHomescreenAvailable
}

const useAddToHomescreenPrompt = () => {
  return React.useCallback(promptAddToHomescreen)
}
