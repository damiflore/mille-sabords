import { createGameAction } from "src/game.store.js"
import { isWitchCard, mixDeck } from "src/Cards/cards.js"
import { SYMBOL_SKULL } from "src/constants.js"

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

export const useMarkScore = createGameAction((state, score) => {
  const { totalScore } = state
  return {
    ...state,
    totalScore: Math.max(totalScore + score, 0),
    scoreMarked: true,
  }
})

export const useUnkeepDice = createGameAction((state, dice) => {
  const { card, cardEffectUsed, diceCursed, diceKept, diceInGame } = state
  if (dice.symbol === SYMBOL_SKULL) {
    return {
      ...state,
      cardEffectUsed: isWitchCard(card) ? true : cardEffectUsed,
      diceCursed: diceCursed.filter((diceCandidate) => diceCandidate !== dice),
      diceInGame: [...diceInGame, dice],
    }
  }

  return {
    ...state,
    diceKept: diceKept.filter((diceCandidate) => diceCandidate !== dice),
    diceInGame: [...diceInGame, dice],
  }
})

export const useKeepDice = createGameAction((state, dice) => {
  const { card, diceInGame, diceCursed, diceKept, cardEffectUsed } = state

  if (dice.symbol === SYMBOL_SKULL) {
    return {
      ...state,
      cardEffectUsed: isWitchCard(card) ? false : cardEffectUsed,
      diceCursed: [...diceCursed, dice],
      diceInGame: diceInGame.filter((diceCandidate) => diceCandidate !== dice),
    }
  }

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
