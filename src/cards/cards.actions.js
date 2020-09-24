import { createAction } from "src/main.store.js"
import { mixDeck } from "src/cards/cards.js"
import { SYMBOL_COIN, SYMBOL_DIAMOND } from "src/symbols/symbols.js"

export const useDrawCard = createAction((state) => {
  const { cardIds, cardUsedIds } = state
  const cardDrawnId = cardIds[0]
  return {
    ...state,
    cardIds: cardIds.slice(1),
    cardUsedIds: [...cardUsedIds, cardDrawnId],
    currentCardId: cardDrawnId,
  }
})

export const useAddExtraCoin = createAction((state) => {
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

export const useAddExtraDiamond = createAction((state) => {
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

export const useShuffleDeck = createAction((state) => {
  const { cardUsedIds } = state
  return {
    ...state,
    cardIds: mixDeck(cardUsedIds),
    cardUsedIds: [],
  }
})
