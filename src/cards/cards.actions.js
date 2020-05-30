import { createGameAction } from "src/game.store.js"
import { mixDeck } from "src/cards/cards.js"

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

export const useShuffleDeck = createGameAction((state) => {
  const { cardsUsed } = state
  return {
    ...state,
    cardsUsed: [],
    cardDeck: mixDeck(cardsUsed),
  }
})
