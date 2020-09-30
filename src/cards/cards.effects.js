import React from "react"

import { useBecomes } from "src/hooks.js"
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
  const drawCoinCard = useBecomes(
    (currentCardIdPrevious) =>
      !currentCardIdPrevious && currentCardId && isCoinCard(cardIdToCard(currentCardId)),
    [currentCardId],
  )

  React.useEffect(() => {
    if (drawCoinCard) {
      addExtraCoin()
    }
  }, [drawCoinCard])
}

const useDiamondCardEffect = () => {
  const addExtraDiamond = useAddExtraDiamond()
  const currentCardId = useCurrentCardId()
  const drawDiamondCard = useBecomes(
    (currentCardIdPrevious) =>
      !currentCardIdPrevious && currentCardId && isDiamondCard(cardIdToCard(currentCardId)),
    [currentCardId],
  )

  React.useEffect(() => {
    if (drawDiamondCard) {
      addExtraDiamond()
    }
  }, [drawDiamondCard])
}
