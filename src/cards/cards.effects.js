import React from "react"
import { useBecomes } from "src/hooks.js"
import { useGameState } from "src/game.store.js"

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
  const state = useGameState()
  const { card } = state
  const cardBecomesDrawn = useCardBecomesDrawn()
  const oneSkullCard = isOneSkullCard(card)
  const activateOneSkullCard = useActivateOneSkullCard()

  useEffect(() => {
    if (cardBecomesDrawn && oneSkullCard) {
      activateOneSkullCard()
    }
  }, [cardBecomesDrawn, oneSkullCard])
}

const useTwoSkullsCardEffect = () => {
  const state = useGameState()
  const { card } = state
  const cardBecomesDrawn = useCardBecomesDrawn()
  const twoSkullSCard = isTwoSkullsCard(card)
  const activateTwoSkullsCard = useActivateTwoSkullsCard()

  useEffect(() => {
    if (cardBecomesDrawn && twoSkullSCard) {
      activateTwoSkullsCard()
    }
  }, [cardBecomesDrawn, twoSkullSCard])
}

const useDiamondCardEffect = () => {
  const state = useGameState()
  const { card } = state
  const cardBecomesDrawn = useCardBecomesDrawn()
  const diamondCard = isDiamondCard(card)
  const activateDiamondCard = useActivateDiamondCard()

  useEffect(() => {
    if (cardBecomesDrawn && diamondCard) {
      activateDiamondCard()
    }
  }, [cardBecomesDrawn, diamondCard])
}

const useCoinCardEffect = () => {
  const state = useGameState()
  const { card } = state
  const cardBecomesDrawn = useCardBecomesDrawn()
  const coinCard = isCoinCard(card)
  const activateCoinCard = useActivateCoinCard()

  useEffect(() => {
    if (cardBecomesDrawn && coinCard) {
      activateCoinCard()
    }
  }, [cardBecomesDrawn, coinCard])
}

const useCardBecomesDrawn = () => {
  const { cardDrawn } = useGameState()
  return useBecomes((cardDrawnPrevious) => !cardDrawnPrevious && cardDrawn, [cardDrawn])
}
