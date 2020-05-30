import React from "react"

import { useBecomes } from "src/hooks.js"
import { useRollIndex, useCurrentCard, useScoreMarked, useIsOnSkullIsland } from "src/game.store.js"
import {
  useThreeSkullsOrMoreInCursedArea,
  useDicesToCurse,
  useSkullCountInCursedArea,
  useRoundScore,
} from "src/game.selectors.js"
import { useMarkScore, useCurseDice, useSendToSkullIsland } from "src/game.actions.js"
import { isSwordChallengeCard } from "src/cards/cards.js"

const { useEffect } = React

export const GameEffects = () => {
  useGameEffects()
  return null
}

export const useGameEffects = () => {
  useCurseDiceEffect()
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
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
  const currentCard = useCurrentCard()
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
  const isOnSkullIsland = useIsOnSkullIsland()
  const currentCard = useCurrentCard()
  const rollIndex = useRollIndex()
  const skullCountInCursedArea = useSkullCountInCursedArea()
  const sendToSkullIsland = useSendToSkullIsland()

  useEffect(() => {
    if (rollIndex !== 0) return

    if (isOnSkullIsland) return

    if (isSwordChallengeCard(currentCard)) return

    if (skullCountInCursedArea < 4) return

    sendToSkullIsland()
  }, [rollIndex, isOnSkullIsland, currentCard, skullCountInCursedArea])
}
