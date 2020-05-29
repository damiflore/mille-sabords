import React from "react"

import {
  useRollIndex,
  useDiceRolled,
  useWitchUncursedDiceId,
  useDiceCursed,
  useCard,
  useScoreMarked,
  useDiceKept,
  useCardDrawn,
} from "src/game.store.js"
import { diceIsOnSkull } from "src/dices/dices.js"
import { isWitchCard, isChestCard } from "src/cards/cards.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

const { useMemo } = React

export const useRollDiceAllowed = ({
  cardDrawn = useCardDrawn(),
  rollIndex = useRollIndex(),
  diceRolled = useDiceRolled(),
  scoreMarked = useScoreMarked(),
  threeSkullOrMoreInCursedArea = useThreeSkullOrMoreInCursedArea(),
  hasSkullsInRolledArea = useHasSkullsInRolledArea(),
} = {}) => {
  if (!cardDrawn) {
    return false
  }

  if (scoreMarked) {
    return false
  }

  if (rollIndex === -1) {
    return true
  }

  if (threeSkullOrMoreInCursedArea) {
    return false
  }

  if (hasSkullsInRolledArea) {
    return false
  }

  if (diceRolled.length < 2) {
    return false
  }

  return true
}

export const useRemainingSpotInCursedArea = ({
  skullCountInCursedArea = useSkullCountInCursedArea(),
} = {}) => {
  return 3 - skullCountInCursedArea
}

export const useHasSkullsInRolledArea = ({ skullsInRolledArea = useSkullsInRolledArea() } = {}) => {
  return skullsInRolledArea.length > 0
}

// TODO: rename this into hasSkullToCurse or something similar
// because witch cards means you can have a skull in the rolled area
// but there is no need to curse it
export const useSkullsInRolledArea = ({
  diceRolled = useDiceRolled(),
  witchUncursedDiceId = useWitchUncursedDiceId(),
} = {}) => {
  return diceRolled.filter((dice) => diceIsOnSkull(dice) && dice.id !== witchUncursedDiceId)
}

export const useThreeSkullOrMoreInCursedArea = ({
  skullCountInCursedArea = useSkullCountInCursedArea(),
} = {}) => {
  return skullCountInCursedArea > 2
}

export const useSkullCountInCursedArea = ({ diceCursed = useDiceCursed() } = {}) => {
  return diceCursed.length
}

export const useRemoveSkullAllowed = ({
  witchUncursedDiceId = useWitchUncursedDiceId(),
  card = useCard(),
  diceCursed = useDiceCursed(),
} = {}) => {
  if (!isWitchCard(card)) {
    return false
  }

  if (diceCursed.length > 2) {
    return false
  }

  if (witchUncursedDiceId) {
    return false
  }

  return true
}

export const useKeepDiceAllowed = ({
  scoreMarked = useScoreMarked(),
  threeSkullOrMoreInCursedArea = useThreeSkullOrMoreInCursedArea(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullOrMoreInCursedArea) {
    return false
  }

  return true
}

export const useUnkeepDiceAllowed = ({
  scoreMarked = useScoreMarked(),
  threeSkullOrMoreInCursedArea = useThreeSkullOrMoreInCursedArea(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullOrMoreInCursedArea) {
    return false
  }

  return true
}

export const useMarkScoreAllowed = ({
  rollIndex = useRollIndex(),
  scoreMarked = useScoreMarked(),
  card = useCard(),
  threeSkullOrMoreInCursedArea = useThreeSkullOrMoreInCursedArea(),
  hasSkullsInRolledArea = useHasSkullsInRolledArea(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullOrMoreInCursedArea) {
    if (isChestCard(card) && rollIndex > 0) {
      return true
    }

    return false
  }

  if (hasSkullsInRolledArea) {
    return false
  }

  return true
}

export const useStartNextRoundAllowed = ({
  rollDiceAllowed = useRollDiceAllowed(),
  markScoreAllowed = useMarkScoreAllowed(),
} = {}) => {
  if (rollDiceAllowed) {
    return false
  }

  if (markScoreAllowed) {
    return false
  }

  return true
}

export const useRoundScore = ({
  card = useCard(),
  diceKept = useDiceKept(),
  scoreMarked = useScoreMarked(),
  markScoreAllowed = useMarkScoreAllowed(),
} = {}) => {
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
