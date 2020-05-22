import React from "react"
import { useGameState } from "src/MilleSabordGame.js"
import { isSwordChallengeCard } from "src/Cards/cards.js"
import { markScore } from "src/game.actions.js"
import { computeIsOnSkullIsland } from "src/SkullIsland/computeIsOnSkullIsland.js"
import { useMarkScorePermission, useRoundScore } from "./game.selectors.js"

const { useEffect, useRef } = React

export const GameLogic = () => {
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
  return null
}

// auto mark score for failed sword challenges
const useFailSwordChallengeEffect = () => {
  const state = useGameState()
  const { card, scoreMarked } = state

  const markScorePermission = useMarkScorePermission(state)
  const markScorePermissionPrevious = usePrevious(markScorePermission)
  const roundScore = useRoundScore()

  useEffect(() => {
    if (
      isSwordChallengeCard(card) &&
      !scoreMarked &&
      markScorePermissionPrevious.allowed &&
      !markScorePermission.allowed
    ) {
      markScore(state, roundScore)
    }
  }, [card, scoreMarked, markScorePermissionPrevious, markScorePermission, roundScore])
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
  const { setIsOnSkullIsland, isOnSkullIsland, card, rollIndex, diceCursed } = useGameState()

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
