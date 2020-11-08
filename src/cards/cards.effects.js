import React from "react"

import { useCurrentCardId } from "src/main.store.js"
import { useBecomes } from "src/hooks.js"
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
  const currentCardBecomesCoinCard = useBecomes(
    (currentCardIdPrevious) => {
      if (!currentCardId) return false
      if (currentCardIdPrevious === currentCardId) return false
      return isCoinCard(cardIdToCard(currentCardId))
    },
    [currentCardId],
  )
  const currentCardIsCoinCard = currentCardId && isCoinCard(cardIdToCard(currentCardId))

  React.useEffect(() => {
    if (currentCardIsCoinCard) {
      addExtraCoin()
    }
  }, [])

  React.useEffect(() => {
    if (currentCardBecomesCoinCard) {
      addExtraCoin()
    }
  }, [currentCardBecomesCoinCard])
}

const useDiamondCardEffect = () => {
  const addExtraDiamond = useAddExtraDiamond()
  const currentCardId = useCurrentCardId()

  const currentCardBecomesDiamondCard = useBecomes(
    (currentCardIdPrevious) => {
      if (!currentCardId) return false
      if (currentCardIdPrevious === currentCardId) return false
      return isDiamondCard(cardIdToCard(currentCardId))
    },
    [currentCardId],
  )
  const currentCardIsDiamondCard = currentCardId && isDiamondCard(cardIdToCard(currentCardId))

  React.useEffect(() => {
    if (currentCardIsDiamondCard) {
      addExtraDiamond()
    }
  }, [])

  React.useEffect(() => {
    if (currentCardBecomesDiamondCard) {
      addExtraDiamond()
    }
  }, [currentCardBecomesDiamondCard])
}
