import React from "react"

import {
  NOT_ENOUGH_DICE_TO_ROLL,
  HAS_THREE_SKULLS_OR_MORE,
  ROUND_NOT_STARTED,
  CARD_NOT_DRAWN,
  SYMBOL_SKULL,
} from "src/constants.js"
import { countSkulls } from "src/Dice/countSkulls.js"
import { isWitchCard, isChestCard, isSwordChallengeCard } from "src/Cards/cards.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

const { useMemo } = React

export const rollDicePermissionSelector = (state) => {
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

  if (rollIndex === -1) {
    return {
      allowed: true,
    }
  }

  if (countSkulls({ card, diceCursed }) > 2) {
    return {
      allowed: false,
      reason: HAS_THREE_SKULLS_OR_MORE,
    }
  }

  const skullsInGame = skullsInGameSelector(state)
  if (skullsInGame.length) {
    return {
      allowed: false,
      // reason is that dice are being cursed
      // they will move from diceInGame to diceCursed
      reason: "",
    }
  }

  if (diceInGame.length < 2) {
    return {
      allowed: false,
      reason: NOT_ENOUGH_DICE_TO_ROLL,
    }
  }

  return {
    allowed: true,
  }
}

export const skullsInGameSelector = (state) => {
  const { diceInGame, diceUncursedByWitch } = state
  return diceInGame.filter((dice) => dice.symbol === SYMBOL_SKULL && dice !== diceUncursedByWitch)
}

export const canRemoveSkullSelector = (state) => {
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
}

export const keepDiceAllowedSelector = (state) => {
  const { card, diceCursed, scoreMarked } = state

  if (scoreMarked) {
    return false
  }
  const skullCount = countSkulls({ card, diceCursed })
  if (skullCount > 2) {
    return false
  }
  return true
}

export const unkeepDiceAllowedSelector = (state) => {
  const { card, diceCursed, scoreMarked } = state

  if (scoreMarked) {
    return false
  }
  const skullCount = countSkulls({ card, diceCursed })
  if (skullCount > 2) {
    return false
  }
  return true
}

export const roundLostSelector = (state) => {
  const { isOnSkullIsland } = state
  if (
    markScorePermissionSelector(state).reason === HAS_THREE_SKULLS_OR_MORE ||
    isOnSkullIsland ||
    swordChallendeFailedSelector(state)
  )
    return true
  return false
}

const swordChallendeFailedSelector = (state) => {
  const { card } = state
  if (isSwordChallengeCard(card) && !markScorePermissionSelector(state).allowed) return true
  return false
}

export const markScorePermissionSelector = (state) => {
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
}

export const nextRoundPermissionSelector = (state) => {
  const { rollIndex } = state
  if (rollIndex === -1) {
    return { allowed: false }
  }

  const rollDicePermission = rollDicePermissionSelector(state)
  const markScorePermission = markScorePermissionSelector(state)
  if (!rollDicePermission.allowed && !markScorePermission.allowed) {
    return { allowed: true }
  }

  return { allowed: false }
}

export const roundScoreSelector = (state) => {
  const { card, diceKept, scoreMarked } = state
  const markScorePermission = markScorePermissionSelector(state)
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
}
