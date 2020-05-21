import React from "react"
import { useGameStore } from "src/MilleSabordGame.js"
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
  const store = useGameStore()
  const { card, scoreMarked } = store

  const markScorePermission = useMarkScorePermission(store)
  const markScorePermissionPrevious = usePrevious(markScorePermission)
  const roundScore = useRoundScore()

  useEffect(() => {
    if (
      isSwordChallengeCard(card) &&
      !scoreMarked &&
      markScorePermissionPrevious.allowed &&
      !markScorePermission.allowed
    ) {
      markScore(store, roundScore)
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
