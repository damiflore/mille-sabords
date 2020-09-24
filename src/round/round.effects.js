import React from "react"

import { useBecomes } from "src/hooks.js"
import { useCurrentCardId, useScoreMarked, useIsOnSkullIsland } from "src/main.store.js"
import { cardIdToCard, isCoinCard, isDiamondCard, isSwordChallengeCard } from "src/cards/cards.js"
import {
  useIsFirstRoll,
  useThreeSkullsOrMoreInCursedArea,
  useDicesToCurse,
  useSkullCountInCursedArea,
  useRoundScore,
} from "src/round/round.selectors.js"
import { useMarkScore, useSendToSkullIsland } from "src/round/round.actions.js"
import { useCurseDice } from "src/dices/dices.actions.js"
import { useAddExtraCoin, useAddExtraDiamond } from "src/cards/cards.actions.js"

const { useEffect } = React

export const GameEffects = () => {
  useGameEffects()
  return null
}

export const useGameEffects = () => {
  useCurseDiceEffect()
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
  useCoinCardEffect()
  useDiamondCardEffect()
}

const useCurseDiceEffect = () => {
  const dicesToCurse = useDicesToCurse()
  const curseDice = useCurseDice()

  useEffect(() => {
    if (dicesToCurse.length === 0) return () => {}

    const timeout = setTimeout(() => {
      dicesToCurse.forEach((dice) => {
        curseDice(dice)
      })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [dicesToCurse])
}

// auto mark score for failed sword challenges
const useFailSwordChallengeEffect = () => {
  const currentCard = cardIdToCard(useCurrentCardId())
  const scoreMarked = useScoreMarked()
  const markScore = useMarkScore()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()
  const threeSkullsOrMoreInCursedAreaBecomesTrue = useBecomes(
    (threeSkullsOrMoreInCursedAreaPrevious) =>
      !threeSkullsOrMoreInCursedAreaPrevious && threeSkullsOrMoreInCursedArea,
    [threeSkullsOrMoreInCursedArea],
  )
  const roundScore = useRoundScore()
  const swordChallengeCard = isSwordChallengeCard(currentCard)

  useEffect(() => {
    if (swordChallengeCard && !scoreMarked && threeSkullsOrMoreInCursedAreaBecomesTrue) {
      markScore(roundScore)
    }
  }, [swordChallengeCard, scoreMarked, threeSkullsOrMoreInCursedAreaBecomesTrue, roundScore])
}

// go to skull island if 4 skulls or more on first roll
const useFourSkullsOrMoreOnFirstRollEffect = () => {
  const isFirstRoll = useIsFirstRoll()
  const currentCard = cardIdToCard(useCurrentCardId())
  const isOnSkullIsland = useIsOnSkullIsland()
  const skullCountInCursedArea = useSkullCountInCursedArea()
  const sendToSkullIsland = useSendToSkullIsland()

  useEffect(() => {
    if (!isFirstRoll) return

    if (isOnSkullIsland) return

    if (isSwordChallengeCard(currentCard)) return

    if (skullCountInCursedArea < 4) return

    sendToSkullIsland()
  }, [isFirstRoll, isOnSkullIsland, currentCard, skullCountInCursedArea])
}

const useCoinCardEffect = () => {
  const addExtraCoin = useAddExtraCoin()
  const currentCard = useCurrentCard()
  const drawCoinCard = useBecomes(
    (currentCardPrevious) => !isCoinCard(currentCardPrevious) && isCoinCard(currentCard),
    [currentCard],
  )

  useEffect(() => {
    if (drawCoinCard) {
      addExtraCoin()
    }
  }, [drawCoinCard])
}

const useDiamondCardEffect = () => {
  const addExtraDiamond = useAddExtraDiamond()
  const currentCard = cardIdToCard(useCurrentCardId())
  const drawDiamondCard = useBecomes(
    (currentCardPrevious) => !isDiamondCard(currentCardPrevious) && isDiamondCard(currentCard),
    [currentCard],
  )

  useEffect(() => {
    if (drawDiamondCard) {
      addExtraDiamond()
    }
  }, [drawDiamondCard])
}
