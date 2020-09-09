import { createGameAction } from "src/game.store.js"
import { mixDeck } from "src/cards/cards.js"
import { SYMBOL_COIN, SYMBOL_DIAMOND } from "src/symbols/symbols.js"

export const useDrawCard = createGameAction((state) => {
  const { cardDeck, cardsUsed } = state
  const cardDrawn = cardDeck[0]
  return {
    ...state,
    cardDeck: cardDeck.slice(1),
    cardsUsed: [...cardsUsed, cardDrawn],
    currentCard: cardDrawn,
  }
})

export const useAddExtraCoin = createGameAction((state) => {
  const { chestSlots } = state
  return {
    ...state,
    chestSlots: {
      ...chestSlots,
      1: {
        type: "symbol",
        value: SYMBOL_COIN,
      },
    },
  }
})

export const useAddExtraDiamond = createGameAction((state) => {
  const { chestSlots } = state
  return {
    ...state,
    chestSlots: {
      ...chestSlots,
      1: {
        type: "symbol",
        value: SYMBOL_DIAMOND,
      },
    },
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
