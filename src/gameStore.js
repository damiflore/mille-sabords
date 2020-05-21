import React from "react"

const { createContext, useContext } = React

const StateContext = createContext(null)
const ActionsContext = createContext(null)

export const useGameState = () => useContext(StateContext)

export const useGameActions = () => useContext(ActionsContext)

export const useGameStore = (initialState) => {
  const state = {}
  const actions = {}
  Object.keys(initialState).forEach((statePropertyName) => {
    const [value, setValue] = React.useState(initialState[statePropertyName])

    state[statePropertyName] = value

    const actionType = statePropertyNameToSetter(statePropertyName)
    actions[actionType] = setValue
  })

  return {
    StateContext,
    state,
    ActionsContext,
    actions,
  }
}

const statePropertyNameToSetter = (statePropertyName) => {
  const firstLetter = statePropertyName.slice(0, 1)
  const firstLetterCapitalized = firstLetter.toUpperCase()
  const remainingLetters = statePropertyName.slice(1)
  const setter = `set${firstLetterCapitalized}${remainingLetters}`
  return setter
}
