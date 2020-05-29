import React from "react"

import { useBecomes } from "src/hooks.js"
import { useRollIndex, useCard, useScoreMarked, useIsOnSkullIsland } from "src/game.store.js"
import {
  useThreeSkullOrMoreInCursedArea,
  useSkullsInRolledArea,
  useSkullCountInCursedArea,
  useRemainingSpotInCursedArea,
  useRoundScore,
} from "src/game.selectors.js"
import { useMarkScore, useCurseDice, useSendToSkullIsland } from "src/game.actions.js"
import { useCardsEffects } from "src/cards/cards.effects.js"
import { isSwordChallengeCard } from "src/cards/cards.js"

const { useEffect } = React

export const GameEffects = () => {
  useGameEffects()
  return null
}

export const useGameEffects = () => {
  useCardsEffects()
  useCurseDiceEffect()
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
}

const useCurseDiceEffect = () => {
  const rollIndex = useRollIndex()
  const curseDice = useCurseDice()
  const skullsInRolledArea = useSkullsInRolledArea()
  const remainingSpotInCursedArea = useRemainingSpotInCursedArea()

  useEffect(() => {
    if (!remainingSpotInCursedArea) {
      return () => {}
    }
    const diceToCurse = skullsInRolledArea.slice(0, remainingSpotInCursedArea)
    const timeout = setTimeout(() => {
      diceToCurse.forEach((dice) => {
        curseDice(dice)
      })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [rollIndex, skullsInRolledArea, remainingSpotInCursedArea])
}

// auto mark score for failed sword challenges
const useFailSwordChallengeEffect = () => {
  const card = useCard()
  const scoreMarked = useScoreMarked()
  const markScore = useMarkScore()
  const threeSkullsOrMoreInCursedArea = useThreeSkullOrMoreInCursedArea()
  const threeSkullsOrMoreInCursedAreaBecomesTrue = useBecomes(
    (threeSkullsOrMoreInCursedAreaPrevious) =>
      !threeSkullsOrMoreInCursedAreaPrevious && threeSkullsOrMoreInCursedArea,
    [threeSkullsOrMoreInCursedArea],
  )
  const roundScore = useRoundScore()
  const swordChallengeCard = isSwordChallengeCard(card)

  useEffect(() => {
    if (swordChallengeCard && !scoreMarked && threeSkullsOrMoreInCursedAreaBecomesTrue) {
      markScore(roundScore)
    }
  }, [swordChallengeCard, scoreMarked, threeSkullsOrMoreInCursedAreaBecomesTrue, roundScore])
}

// go to skull island if 4 skulls or more on first roll
const useFourSkullsOrMoreOnFirstRollEffect = () => {
  const isOnSkullIsland = useIsOnSkullIsland()
  const card = useCard()
  const rollIndex = useRollIndex()
  const skullCountInCursedArea = useSkullCountInCursedArea()
  const sendToSkullIsland = useSendToSkullIsland()

  useEffect(() => {
    if (rollIndex !== 0) return

    if (isOnSkullIsland) return

    if (isSwordChallengeCard(card)) return

    if (skullCountInCursedArea < 4) return

    sendToSkullIsland()
  }, [rollIndex, isOnSkullIsland, skullCountInCursedArea, card])
}
