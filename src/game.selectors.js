import React from "react"
import {
  NOT_ENOUGH_DICE_TO_ROLL,
  HAS_THREE_SKULLS_OR_MORE,
  ROUND_NOT_STARTED,
  CARD_NOT_DRAWN,
} from "src/constants.js"
import { createGameSelector } from "src/game.store.js"
import { countSkulls } from "src/Dice/countSkulls.js"
import { isWitchCard, isChestCard } from "src/Cards/cards.js"
import { computeRoundScore } from "./Score/computeRoundScore.js"

const { useMemo } = React

export const useRollDicePermission = createGameSelector((state) => {
  const { rollIndex, diceInGame, cardDrawn, scoreMarked, card, diceCursed } = state

  if (!cardDrawn) {
    return {
      allowed: false,
      reason: CARD_NOT_DRAWN,
    }
  }

  if (scoreMarked) {
    return {
      allowed: false,
      reason: ROUND_NOT_STARTED,
    }
  }

  if (countSkulls({ card, diceCursed }) > 2) {
    return {
      allowed: false,
      reason: HAS_THREE_SKULLS_OR_MORE,
    }
  }

  if (rollIndex > -1 && diceInGame.length < 2) {
    return {
      allowed: false,
      reason: NOT_ENOUGH_DICE_TO_ROLL,
    }
  }

  return {
    allowed: true,
    reason: "",
  }
})

export const useCanRemoveSkull = createGameSelector((state) => {
  const { cardEffectUsed, card, diceCursed } = state

  if (!isWitchCard(card)) {
    return false
  }
  if (diceCursed.length > 2) {
    return false
  }
  if (cardEffectUsed) {
    return false
  }
  return true
})

export const useKeepDiceAllowed = createGameSelector((state) => {
  const { card, diceCursed, scoreMarked } = state

  if (scoreMarked) {
    return false
  }
  const skullCount = countSkulls({ card, diceCursed })
  if (skullCount > 2) {
    return false
  }
  return true
})

export const useUnkeepDiceAllowed = createGameSelector((state) => {
  const { card, diceCursed, scoreMarked } = state

  if (scoreMarked) {
    return false
  }
  const skullCount = countSkulls({ card, diceCursed })
  if (skullCount > 2) {
    return false
  }
  return true
})

export const useMarkScorePermission = createGameSelector((state) => {
  const { rollIndex, scoreMarked, card, diceCursed } = state

  if (scoreMarked) {
    return {
      allowed: false,
    }
  }

  const skullCount = countSkulls({ card, diceCursed })
  if (skullCount > 2) {
    if (isChestCard(card) && rollIndex > 0) {
      return {
        allowed: true,
      }
    }

    return {
      allowed: false,
      reason: HAS_THREE_SKULLS_OR_MORE,
    }
  }

  return {
    allowed: true,
  }
})

export const useNextRoundPermission = createGameSelector((state) => {
  const { rollIndex } = state
  if (rollIndex === -1) {
    return { allowed: false }
  }

  const rollDicePermission = useRollDicePermission(state)
  const markScorePermission = useMarkScorePermission(state)
  if (!rollDicePermission.allowed && !markScorePermission.allowed) {
    return { allowed: true }
  }

  return { allowed: false }
})

export const useRoundScore = createGameSelector((state) => {
  const { card, diceKept, scoreMarked } = state
  const markScorePermission = useMarkScorePermission(state)
  return useMemo(
    () =>
      computeRoundScore({
        card,
        diceKept,
        scoreMarked,
        markScoreAllowed: markScorePermission.allowed,
      }),
    [card, diceKept, markScorePermission],
  )
})
