import React from "react"

import { SYMBOL_SKULL } from "src/constants.js"
import { isWitchCard, isChestCard } from "src/Cards/cards.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

const { useMemo } = React

export const rollDiceAllowedSelector = (state) => {
  const { rollIndex, diceRolled, cardDrawn, scoreMarked } = state
  if (!cardDrawn) {
    return false
  }

  if (scoreMarked) {
    return false
  }

  if (rollIndex === -1) {
    return true
  }

  if (threeSkullOrMoreInCursedAreaSelector(state)) {
    return false
  }

  if (hasSkullsInRolledAreaSelector(state)) {
    return false
  }

  if (diceRolled.length < 2) {
    return false
  }

  return true
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
  const { diceCursed } = state
  return diceCursed.length
}

export const removeSkullAllowedSelector = (state) => {
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

export const markScoreAllowedSelector = (state) => {
  const { rollIndex, scoreMarked, card } = state

  if (scoreMarked) {
    return false
  }

  if (threeSkullOrMoreInCursedAreaSelector(state)) {
    if (isChestCard(card) && rollIndex > 0) {
      return true
    }

    return false
  }

  return true
}

export const startNextRoundAllowedSelector = (state) => {
  const { rollIndex } = state
  if (rollIndex === -1) {
    return false
  }

  const rollDiceAllowed = rollDiceAllowedSelector(state)
  if (rollDiceAllowed) {
    return false
  }

  const markScoreAllowed = markScoreAllowedSelector(state)
  if (markScoreAllowed) {
    return false
  }

  return true
}

export const roundScoreSelector = (state) => {
  const { card, diceKept, scoreMarked } = state
  const markScoreAllowed = markScoreAllowedSelector(state)
  return useMemo(
    () =>
      computeRoundScore({
        card,
        diceKept,
        scoreMarked,
        markScoreAllowed,
      }),
    [card, diceKept, scoreMarked, markScoreAllowed],
  )
}
