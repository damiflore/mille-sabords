import React from "react"

import { useCurrentCardId, useCurrentCardActivated } from "/app/main.store.js"
import { useBecomes } from "/app/hooks.js"
import { cardIdToCard, isCoinCard, isDiamondCard } from "/app/cards/cards.js"
import {
  useAddExtraCoin,
  useAddExtraDiamond,
} from "/app/cards/cards.actions.js"

export const CardsEffects = () => {
  useCoinCardEffect()
  useDiamondCardEffect()
  return null
}

const useCoinCardEffect = () => {
  const addExtraCoin = useAddExtraCoin()
  const currentCardId = useCurrentCardId()
  const currentCardActivated = useCurrentCardActivated()

  const currentCardBecomesActivated = useBecomes(
    (currentCardActivatedPrevious) =>
      !currentCardActivatedPrevious === currentCardActivated,
    [currentCardActivated],
  )
  const currentCardIsCoinCard =
    currentCardId && isCoinCard(cardIdToCard(currentCardId))

  React.useEffect(() => {
    if (currentCardIsCoinCard) {
      addExtraCoin()
    }
  }, [])

  React.useEffect(() => {
    if (currentCardBecomesActivated && currentCardIsCoinCard) {
      addExtraCoin()
    }
  }, [currentCardBecomesActivated, currentCardIsCoinCard])
}

const useDiamondCardEffect = () => {
  const addExtraDiamond = useAddExtraDiamond()
  const currentCardId = useCurrentCardId()
  const currentCardActivated = useCurrentCardActivated()

  const currentCardBecomesActivated = useBecomes(
    (currentCardActivatedPrevious) =>
      !currentCardActivatedPrevious === currentCardActivated,
    [currentCardActivated],
  )
  const currentCardIsDiamondCard =
    currentCardId && isDiamondCard(cardIdToCard(currentCardId))

  React.useEffect(() => {
    if (currentCardIsDiamondCard) {
      addExtraDiamond()
    }
  }, [])

  React.useEffect(() => {
    if (currentCardBecomesActivated && currentCardIsDiamondCard) {
      addExtraDiamond()
    }
  }, [currentCardBecomesActivated, currentCardIsDiamondCard])
}
