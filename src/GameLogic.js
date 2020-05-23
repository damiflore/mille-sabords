import React from "react"
import { useGameState } from "src/game.store.js"
import { useMarkScorePermission, useRoundScore } from "src/game.selectors.js"
import { useMarkScore, useCurseDice, useSendToSkullIsland } from "src/game.actions.js"
import { SYMBOL_SKULL } from "src/constants.js"
import { isSwordChallengeCard } from "src/Cards/cards.js"
import { countSkulls } from "src/Dice/countSkulls.js"

const { useEffect, useRef } = React

export const GameLogic = () => {
  useCurseDiceEffect()
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
  return null
}

const useCurseDiceEffect = () => {
  const { diceInGame, rollIndex } = useGameState()
  const curseDice = useCurseDice()

  useEffect(() => {
    diceInGame.forEach((dice) => {
      if (dice.symbol === SYMBOL_SKULL) {
        curseDice(dice)
      }
    })
  }, [
    diceInGame,
    // rollIndex because rolling dices may change their symbol
    // (but I guess in that case diceinGame may change but not sure)
    rollIndex,
  ])
}

// auto mark score for failed sword challenges
const useFailSwordChallengeEffect = () => {
  const state = useGameState()
  const { card, scoreMarked } = state
  const markScore = useMarkScore()
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
