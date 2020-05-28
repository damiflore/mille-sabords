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
    diceRolled: diceRolled.filter((diceCandidate) => diceCandidate !== dice),
    diceCursed: [...diceCursed, dice],
  }
})

export const useUncurseDice = createGameAction((state, dice) => {
  const { diceCursed, diceRolled } = state
  return {
    ...state,
    witchUncursedDiceId: dice.id,
    diceCursed: diceCursed.filter((diceCandidate) => diceCandidate !== dice),
    diceRolled: [...diceRolled, dice],
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

export const useUnkeepDice = createGameAction((state, dice) => {
  const { diceKept, diceRolled } = state

  return {
    ...state,
    diceKept: diceKept.filter((diceCandidate) => diceCandidate !== dice),
    diceRolled: [...diceRolled, dice],
  }
})

export const useKeepDice = createGameAction((state, dice) => {
  const { diceRolled, diceKept } = state

  return {
    ...state,
    diceKept: [...diceKept, dice],
    diceRolled: diceRolled.filter((diceCandidate) => diceCandidate !== dice),
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
