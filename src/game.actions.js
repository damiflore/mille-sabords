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
  const { diceRolled, diceCursed } = state
  return {
    ...state,
    diceRolled: diceRolled.filter((diceRolledId) => diceRolledId !== dice.id),
    diceCursed: [...diceCursed, dice.id],
  }
})

export const useUncurseDice = createGameAction((state, dice) => {
  const { diceCursed, diceRolled } = state
  return {
    ...state,
    witchUncursedDiceId: dice.id,
    diceRolled: [...diceRolled, dice.id],
    diceCursed: diceCursed.filter((diceCurseId) => diceCurseId !== dice.id),
  }
})

export const useUnkeepDice = createGameAction((state, dice) => {
  const { diceKept, diceRolled } = state
  return {
    ...state,
    diceRolled: [...diceRolled, dice.id],
    diceKept: diceKept.filter((diceKeptId) => diceKeptId !== dice.id),
  }
})

export const useKeepDice = createGameAction((state, dice) => {
  const { diceRolled, diceKept } = state
  return {
    ...state,
    diceRolled: diceRolled.filter((diceRolledId) => diceRolledId !== dice.id),
    diceKept: [...diceKept, dice.id],
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
