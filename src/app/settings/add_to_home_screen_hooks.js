import React from "react"
import { addToHomescreen } from "@jsenv/pwa"

export const useAddToHomescreen = () => {
  const available = useAddToHomescreenAvailable()
  const prompt = useAddToHomescreenPrompt()
  return [available, prompt]
}

const useAddToHomescreenAvailable = () => {
  const [addToHomescreenAvailable, addToHomescreenAvailableSetter] =
    React.useState(addToHomescreen.availableRef.current)

  React.useEffect(() => {
    return addToHomescreen.availableRef.subscribe(() => {
      addToHomescreenAvailableSetter(addToHomescreen.availableRef.current)
    })
  }, [])

  return addToHomescreenAvailable
}

const useAddToHomescreenPrompt = () => {
  return React.useCallback(addToHomescreen.prompt)
}
