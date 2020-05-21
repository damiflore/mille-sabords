import React from "react"

export const useStore = (state) => {
  const store = {}

  Object.keys(state).forEach((statePropertyName) => {
    const [value, setValue] = React.useState(state[statePropertyName])
    store[statePropertyName] = value
    const actionType = statePropertyNameToSetter(statePropertyName)
    store[actionType] = setValue
  })

  return store
}

const statePropertyNameToSetter = (statePropertyName) => {
  const firstLetter = statePropertyName.slice(0, 1)
  const firstLetterCapitalized = firstLetter.toUpperCase()
  const remainingLetters = statePropertyName.slice(1)
  const setter = `set${firstLetterCapitalized}${remainingLetters}`
  return setter
}
