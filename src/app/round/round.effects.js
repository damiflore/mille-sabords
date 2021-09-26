import React from "react"

import { useBecomes } from "root/src/app/hooks.js"
import {
  useCurrentCardId,
  useScoreMarked,
  useIsOnSkullIsland,
  useAnimationsDisabled,
} from "root/src/app/main.store.js"
import { cardIdToCard, isSwordChallengeCard } from "root/src/app/cards/cards.js"
import {
  useIsFirstRoll,
  useThreeSkullsOrMoreInCursedArea,
  useDicesToCurse,
  useSkullCountInCursedArea,
  useRoundScore,
} from "root/src/app/round/round.selectors.js"
import {
  useMarkScore,
  useSendToSkullIsland,
} from "root/src/app/round/round.actions.js"
import { useCurseDice } from "root/src/app/dices/dices.actions.js"

const { useEffect } = React

export const RoundEffects = () => {
  useRoundEffects()
  return null
}

export const useRoundEffects = () => {
  useCurseDiceEffect()
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
}

const useCurseDiceEffect = () => {
  const animationsDisabled = useAnimationsDisabled()
  const dicesToCurse = useDicesToCurse()
  const curseDice = useCurseDice()

  useEffect(() => {
    if (dicesToCurse.length === 0) {
      return () => {}
    }

    if (animationsDisabled) {
      dicesToCurse.forEach((dice) => {
        curseDice(dice)
      })
      return () => {}
    }

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
    if (
      swordChallengeCard &&
      !scoreMarked &&
      threeSkullsOrMoreInCursedAreaBecomesTrue
    ) {
      markScore(roundScore)
    }
  }, [
    swordChallengeCard,
    scoreMarked,
    threeSkullsOrMoreInCursedAreaBecomesTrue,
    roundScore,
  ])
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
