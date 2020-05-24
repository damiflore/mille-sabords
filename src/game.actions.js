import { createGameAction } from "src/game.store.js"
import { mixDeck } from "src/Cards/cards.js"

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
  const { diceInGame, diceCursed } = state
  return {
    ...state,
    diceInGame: diceInGame.filter((diceCandidate) => diceCandidate !== dice),
    diceCursed: [...diceCursed, dice],
  }
})

export const useUncurseDice = createGameAction((state, dice) => {
  const { diceCursed, diceInGame } = state
  return {
    ...state,
    cardEffectUsed: true,
    diceUncursedByWitch: dice,
    diceCursed: diceCursed.filter((diceCandidate) => diceCandidate !== dice),
    diceInGame: [...diceInGame, dice],
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
  const { diceKept, diceInGame } = state

  return {
    ...state,
    diceKept: diceKept.filter((diceCandidate) => diceCandidate !== dice),
    diceInGame: [...diceInGame, dice],
  }
})

export const useKeepDice = createGameAction((state, dice) => {
  const { diceInGame, diceKept } = state

  return {
    ...state,
    diceKept: [...diceKept, dice],
    diceInGame: diceInGame.filter((diceCandidate) => diceCandidate !== dice),
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
  const newDeck = cardsUsed.slice()
  mixDeck(newDeck)
  return {
    ...state,
    cardsUsed: [],
    cardDeck: newDeck,
  }
})
