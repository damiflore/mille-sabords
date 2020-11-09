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
  const { cardIds, cardUsedIds } = state
  return {
    ...state,
    // shuffle deck is conceptually the action of taking all the cards
    // and shuffling them.
    // hence the [...cardIds, ...cardUsedIds]
    // For now shuffleDeck is called when cardsIds is empty.
    // If we change [...cardIds, ...cardUsedIds] by cardUsedIds
    // it makes shuffleDeck less robust because it cannot be called twice
    // or at any time.
    cardIds: mixDeck([...cardIds, ...cardUsedIds]),
    cardUsedIds: [],
  }
})

export const useUndrawCard = createAction((state) => {
  const { currentCardId, cardIds, cardUsedIds } = state
  return {
    ...state,
    currentCardId: null,
    cardIds: [currentCardId, ...cardIds],
    cardUsedIds: cardUsedIds.slice(1),
  }
})
