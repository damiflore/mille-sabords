import React from "react"
import { useGameStore } from "src/MilleSabordGame.js"
import { isSwordChallengeCard, isWitchCard } from "src/Cards/cards.js"
import { markScore } from "src/game.actions.js"
import { computeIsOnSkullIsland } from "src/SkullIsland/computeIsOnSkullIsland.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"
import { useMarkScorePermission } from "./game.selectors.js"

const { useEffect, useRef } = React

export const GameLogic = () => {
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
  useRoundScore()
  return null
}

// auto mark score for failed sword challenges
const useFailSwordChallengeEffect = () => {
  const store = useGameStore()
  const { card, scoreMarked } = store

  const markScorePermission = useMarkScorePermission(store)
  const markScorePermissionPrevious = usePrevious(markScorePermission)

  useEffect(() => {
    if (
      isSwordChallengeCard(card) &&
      !scoreMarked &&
      markScorePermissionPrevious.allowed &&
      !markScorePermission.allowed
    ) {
      markScore(store)
    }
  }, [card, scoreMarked, markScorePermissionPrevious, markScorePermission])
}

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// go to skull island if 4 skulls or more on first roll
const useFourSkullsOrMoreOnFirstRollEffect = () => {
  const { setIsOnSkullIsland, isOnSkullIsland, card, rollIndex, diceCursed } = useGameStore()

  useEffect(() => {
    setIsOnSkullIsland(
      computeIsOnSkullIsland({
        isOnSkullIsland,
        card,
        rollIndex,
        diceCursed,
      }),
    )
  }, [card, rollIndex, diceCursed])
}

// roundScore (derived state aussi non ?)
const useRoundScore = () => {
  const { setRoundScore, card, diceKept } = useGameStore()
  const markScorePermission = useMarkScorePermission()

  useEffect(() => {
    setRoundScore(
      computeRoundScore({
        card,
        diceKept,
        markScoreAllowed: markScorePermission.allowed,
      }),
    )
  }, [card, diceKept, markScorePermission])
}
