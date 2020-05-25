import React from "react"

import {
  NOT_ENOUGH_DICE_TO_ROLL,
  HAS_THREE_SKULLS_OR_MORE,
  ROUND_NOT_STARTED,
  CARD_NOT_DRAWN,
  SYMBOL_SKULL,
} from "src/constants.js"
import {
  isWitchCard,
  isChestCard,
  isSwordChallengeCard,
  isOneSkullCard,
  isTwoSkullsCard,
} from "src/Cards/cards.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

const { useMemo } = React

export const rollDicePermissionSelector = (state) => {
  const { rollIndex, diceRolled, cardDrawn, scoreMarked } = state

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

  if (threeSkullOrMoreInCursedAreaSelector(state)) {
    return {
      allowed: false,
      reason: HAS_THREE_SKULLS_OR_MORE,
    }
  }

  if (hasSkullsInRolledAreaSelector(state)) {
    return {
      allowed: false,
      // reason is that dice are being cursed
      // they will move from diceRolled to diceCursed
      reason: "",
    }
  }

  if (diceRolled.length < 2) {
    return {
      allowed: false,
      reason: NOT_ENOUGH_DICE_TO_ROLL,
    }
  }

  return {
    allowed: true,
  }
}

export const remainingSpotInCursedAreaSelector = (state) =>
  3 - skullCountInCursedAreaSelector(state)

export const hasSkullsInRolledAreaSelector = (state) => skullsInRolledAreaSelector(state).length > 0

export const skullsInRolledAreaSelector = (state) => {
  const { diceRolled, diceUncursedByWitch } = state
  return diceRolled.filter((dice) => dice.symbol === SYMBOL_SKULL && dice !== diceUncursedByWitch)
}

export const threeSkullOrMoreInCursedAreaSelector = (state) =>
  skullCountInCursedAreaSelector(state) > 2

export const skullCountInCursedAreaSelector = (state) => {
  const { card, diceCursed } = state
  if (isOneSkullCard(card)) {
    return diceCursed.length + 1
  }

  if (isTwoSkullsCard(card)) {
    return diceCursed.length + 2
  }

  return diceCursed.length
}

export const canRemoveSkullSelector = (state) => {
  const { diceUncursedByWitch, card, diceCursed } = state

  if (!isWitchCard(card)) {
    return false
  }
  if (diceCursed.length > 2) {
    return false
  }
  if (diceUncursedByWitch) {
    return false
  }
  return true
}

export const keepDiceAllowedSelector = (state) => {
  const { scoreMarked } = state

  if (scoreMarked) {
    return false
  }
  if (threeSkullOrMoreInCursedAreaSelector(state)) {
    return false
  }
  return true
}

export const unkeepDiceAllowedSelector = (state) => {
  const { scoreMarked } = state

  if (scoreMarked) {
    return false
  }
  if (threeSkullOrMoreInCursedAreaSelector(state)) {
    return false
  }
  return true
}

export const roundLostSelector = (state) => {
  const { isOnSkullIsland } = state
  if (isOnSkullIsland) {
    return true
  }

  if (threeSkullOrMoreInCursedAreaSelector(state)) {
    return true
  }

  if (swordChallendeFailedSelector(state)) {
    return true
  }

  return false
}

const swordChallendeFailedSelector = (state) => {
  const { card } = state
  if (isSwordChallengeCard(card) && !markScorePermissionSelector(state).allowed) return true
  return false
}

export const markScorePermissionSelector = (state) => {
  const { rollIndex, scoreMarked, card } = state

  if (scoreMarked) {
    return {
      allowed: false,
    }
  }

  if (threeSkullOrMoreInCursedAreaSelector(state)) {
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
