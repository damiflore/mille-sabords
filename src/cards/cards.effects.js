import React from "react"
import { useBecomes } from "src/hooks.js"
import { useCard, useCardDrawn } from "src/game.store.js"

import { isOneSkullCard, isTwoSkullsCard, isDiamondCard, isCoinCard } from "src/cards/cards.js"
import {
  useActivateOneSkullCard,
  useActivateTwoSkullsCard,
  useActivateDiamondCard,
  useActivateCoinCard,
} from "src/cards/cards.actions.js"

const { useEffect } = React

export const useCardsEffects = () => {
  useOneSkullCardEffect()
  useTwoSkullsCardEffect()
  useDiamondCardEffect()
  useCoinCardEffect()
}

const useOneSkullCardEffect = () => {
  const card = useCard()
  const cardBecomesDrawn = useCardBecomesDrawn()
  const activateOneSkullCard = useActivateOneSkullCard()
  const oneSkullCard = isOneSkullCard(card)

  useEffect(() => {
    if (cardBecomesDrawn && oneSkullCard) {
      activateOneSkullCard()
    }
  }, [cardBecomesDrawn, oneSkullCard])
}

const useTwoSkullsCardEffect = () => {
  const card = useCard()
  const cardBecomesDrawn = useCardBecomesDrawn()
  const activateTwoSkullsCard = useActivateTwoSkullsCard()
  const twoSkullSCard = isTwoSkullsCard(card)

  useEffect(() => {
    if (cardBecomesDrawn && twoSkullSCard) {
      activateTwoSkullsCard()
    }
  }, [cardBecomesDrawn, twoSkullSCard])
}

const useDiamondCardEffect = () => {
  const card = useCard()
  const cardBecomesDrawn = useCardBecomesDrawn()
  const activateDiamondCard = useActivateDiamondCard()
  const diamondCard = isDiamondCard(card)

  useEffect(() => {
    if (cardBecomesDrawn && diamondCard) {
      activateDiamondCard()
    }
  }, [cardBecomesDrawn, diamondCard])
}

const useCoinCardEffect = () => {
  const card = useCard()
  const cardBecomesDrawn = useCardBecomesDrawn()
  const activateCoinCard = useActivateCoinCard()
  const coinCard = isCoinCard(card)

  useEffect(() => {
    if (cardBecomesDrawn && coinCard) {
      activateCoinCard()
    }
  }, [cardBecomesDrawn, coinCard])
}

const useCardBecomesDrawn = () => {
  const cardDrawn = useCardDrawn()
  return useBecomes((cardDrawnPrevious) => !cardDrawnPrevious && cardDrawn, [cardDrawn])
}
