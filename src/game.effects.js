import React from "react"

import { useGameState } from "src/game.store.js"
import { markScorePermissionSelector, roundScoreSelector } from "src/game.selectors.js"
import { useMarkScore, useCurseDice, useSendToSkullIsland } from "src/game.actions.js"

import { isSwordChallengeCard } from "src/Cards/cards.js"
import { countSkulls } from "src/Dice/countSkulls.js"
import { SYMBOL_SKULL } from "src/constants.js"

const { useEffect, useRef } = React

export const GameEffects = () => {
  useCurseDiceEffect()
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
  return null
}

const useCurseDiceEffect = () => {
  const state = useGameState()
  const { rollIndex, diceInGame, diceCursed, diceUncursedByWitch } = state
  const curseDice = useCurseDice()

  useEffect(() => {
    const diceCursedCount = diceCursed.length
    const remainingCursedSpot = Math.max(3 - diceCursedCount, 0)
    if (!remainingCursedSpot) {
      return () => {}
    }
    const skullsInGame = diceInGame.filter((dice) => {
      return dice.symbol === SYMBOL_SKULL && dice !== diceUncursedByWitch
    })
    const diceToCurse = skullsInGame.slice(0, remainingCursedSpot)
    const timeout = setTimeout(() => {
      diceToCurse.forEach((dice) => {
        curseDice(dice)
      })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [diceInGame, diceCursed, rollIndex])
}

// auto mark score for failed sword challenges
const useFailSwordChallengeEffect = () => {
  const state = useGameState()
  const { card, scoreMarked } = state
  const markScore = useMarkScore()
  const markScorePermission = markScorePermissionSelector(state)
  const markScorePermissionPrevious = usePrevious(markScorePermission)
  const roundScore = roundScoreSelector(state)

  useEffect(() => {
    if (
      isSwordChallengeCard(card) &&
      !scoreMarked &&
      markScorePermissionPrevious &&
      markScorePermissionPrevious.allowed &&
      !markScorePermission.allowed
    ) {
      markScore(roundScore)
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
  const { isOnSkullIsland, card, rollIndex, diceCursed } = useGameState()
  const sendToSkullIsland = useSendToSkullIsland()

  useEffect(() => {
    if (isOnSkullIsland) return

    if (rollIndex !== 0) return

    if (isSwordChallengeCard(card)) return

    if (countSkulls({ card, diceCursed }) < 4) return

    sendToSkullIsland()
  }, [isOnSkullIsland, card, rollIndex, diceCursed])
}
