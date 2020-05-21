import React from "react"
import { getMixedDeck } from "./Cards/cards.js"
import { getDiceArray } from "src/Dice/DiceHelpers.js"

const dices = getDiceArray()
const defaultState = {
  totalScore: 0,
  roundScore: 0,
  scoreMarked: false,
  isOnSkullIsland: false,
  rollDicePermission: {},
  keepDiceAllowed: false,
  unkeepDiceAllowed: false,
  markScorePermission: {},
  nextRoundPermission: {},
  canRemoveSkull: false,
  cardDeck: getMixedDeck(),
  cardsUsed: [],
  card: null,
  cardEffectUsed: false,
  cardDrawn: false,
  rollIndex: -1,
  dices,
  diceOffGame: dices,
  diceInGame: [],
  diceCursed: [],
  diceKept: [],
}

const { createContext, useContext } = React

const StateContext = createContext(null)
const ActionsContext = createContext(null)

export const useGameState = () => useContext(StateContext)

export const useGameActions = () => useContext(ActionsContext)

export const useGameStore = (initialState) => {
  const currentState = {
    ...defaultState,
    ...initialState,
  }
  const [state, dispatch] = React.useReducer(reducer, currentState)

  const actions = {}
  Object.keys(actionHandlers).forEach((actionType) => {
    actions[actionType] = (payload) => {
      dispatch({
        type: actionType,
        payload,
      })
    }
  })

  return {
    StateContext,
    state,
    ActionsContext,
    actions,
  }
}

const statePropertyNameToActionTypeSetter = (statePropertyName) => {
  const firstLetter = statePropertyName.slice(0, 1)
  const firstLetterCapitalized = firstLetter.toUpperCase()
  const remainingLetters = statePropertyName.slice(1)
  const actionType = `set${firstLetterCapitalized}${remainingLetters}`
  return actionType
}

const actionHandlers = {}
Object.keys(defaultState).forEach((statePropertyName) => {
  const actionType = statePropertyNameToActionTypeSetter(statePropertyName)
  actionHandlers[actionType] = (state, payload) => {
    return {
      ...state,
      [statePropertyName]: payload,
    }
  }
})
const reducer = (state, action) => {
  const { type } = action
  if (type in actionHandlers) {
    const actionHandler = actionHandlers[type]
    return actionHandler(state, action.payload)
  }
  return state
}
