import { createGameAction } from "src/game.store.js"
import { mixDeck } from "src/cards/cards.js"

export const useDrawCard = createGameAction((state) => {
  const { cardDeck, cardsUsed } = state
  const cardDrawn = cardDeck[0]
  return {
    ...state,
    cardDrawn: true,
    cardDeck: cardDeck.slice(1),
    cardsUsed: [...cardsUsed, cardDrawn],
    card: cardDrawn,
  }
})

export const useCurseDice = createGameAction((state, dice) => {
  const { dicesRolled, dicesCursed } = state
  return {
    ...state,
    dicesRolled: dicesRolled.filter((diceRolled) => diceRolled.id !== dice.id),
    dicesCursed: [...dicesCursed, dice],
  }
})

export const useUncurseDice = createGameAction((state, dice) => {
  const { dicesRolled, dicesCursed } = state
  return {
    ...state,
    witchUncursedDiceId: dice.id,
    dicesRolled: [...dicesRolled, dice],
    dicesCursed: dicesCursed.filter((diceCursed) => diceCursed.id !== dice.id),
  }
})

export const useUnkeepDice = createGameAction((state, dice) => {
  const { dicesRolled, dicesKept } = state
  return {
    ...state,
    dicesRolled: [...dicesRolled, dice],
    dicesKept: dicesKept.filter((diceKept) => diceKept.id !== dice.id),
  }
})

export const useKeepDice = createGameAction((state, dice) => {
  const { dicesRolled, dicesKept } = state
  return {
    ...state,
    dicesRolled: dicesRolled.filter((diceRolled) => diceRolled.id !== dice.id),
    dicesKept: [...dicesKept, dice],
  }
})

export const useMarkScore = createGameAction((state, score) => {
  const { totalScore } = state
  return {
    ...state,
    totalScore: Math.max(totalScore + score, 0),
    scoreMarked: true,
  }
})

export const useSendToSkullIsland = createGameAction((state) => {
  return {
    ...state,
    isOnSkullIsland: true,
  }
})

export const useShuffleDeck = createGameAction((state) => {
  const { cardsUsed } = state
  return {
    ...state,
    cardsUsed: [],
    cardDeck: mixDeck(cardsUsed),
  }
})
