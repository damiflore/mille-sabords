import React from "react"

import { useCurrentCardId } from "src/main.store.js"
import { cardIdToCard, isCoinCard, isDiamondCard } from "src/cards/cards.js"
import { useAddExtraCoin, useAddExtraDiamond } from "src/cards/cards.actions.js"

export const CardsEffects = () => {
  useCoinCardEffect()
  useDiamondCardEffect()
  return null
}

const useCoinCardEffect = () => {
  const addExtraCoin = useAddExtraCoin()
  const currentCardId = useCurrentCardId()

  React.useEffect(() => {
    const coinCard = isCoinCard(cardIdToCard(currentCardId))
    if (coinCard) {
      addExtraCoin()
    }
  }, [currentCardId])
}

const useDiamondCardEffect = () => {
  const addExtraDiamond = useAddExtraDiamond()
  const currentCardId = useCurrentCardId()

  React.useEffect(() => {
    const diamondCard = isDiamondCard(cardIdToCard(currentCardId))
    if (diamondCard) {
      addExtraDiamond()
    }
  }, [currentCardId])
}
