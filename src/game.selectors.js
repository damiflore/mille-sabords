import React from "react"
import { countSkulls } from "src/Dice/countSkulls.js"
import { isWitchCard, isChestCard } from "src/Cards/cards.js"
import {
  NOT_ENOUGH_DICE_TO_ROLL,
  HAS_THREE_SKULLS_OR_MORE,
  ROUND_NOT_STARTED,
  CARD_NOT_DRAWN,
} from "src/constants.js"
import { useGameStore } from "./MilleSabordGame.js"
import { computeRoundScore } from "./Score/computeRoundScore.js"

const { useMemo } = React

export const useRollDicePermission = (
  { rollIndex, diceInGame, cardDrawn, scoreMarked, card, diceCursed } = useGameStore(),
) => {
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

  if (rollIndex > 0 && diceInGame.length < 2) {
    return {
      allowed: false,
      reason: NOT_ENOUGH_DICE_TO_ROLL,
    }
  }

  return {
    allowed: true,
    reason: "",
  }
}

export const useCanRemoveSkull = ({ cardEffectUsed, card, diceCursed } = useGameStore()) => {
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

export const useKeepDiceAllowed = ({ card, diceCursed, scoreMarked } = useGameStore()) => {
  const skullCount = countSkulls({ card, diceCursed })
  if (skullCount > 2 || scoreMarked) {
    return false
  }
  return true
}

export const useUnkeepDiceAllowed = ({ card, diceCursed, scoreMarked } = useGameStore()) => {
  const skullCount = countSkulls({ card, diceCursed })
  if (skullCount > 2 || scoreMarked) {
    return false
  }
  return true
}

export const useMarkScorePermission = (
  { rollIndex, scoreMarked, card, diceCursed } = useGameStore(),
) => {
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

export const useNextRoundPermission = ({ rollIndex } = useGameStore()) => {
  const rollDicePermission = useRollDicePermission()
  const markScorePermission = useMarkScorePermission()

  if (rollIndex === -1) {
    return { allowed: false }
  }

  if (!rollDicePermission.allowed && !markScorePermission.allowed) {
    return { allowed: true }
  }

  return { allowed: false }
}

export const useRoundScore = ({ card, diceKept } = useGameStore()) => {
  const markScorePermission = useMarkScorePermission()
  return useMemo(() => {
    return computeRoundScore({
      card,
      diceKept,
      markScoreAllowed: markScorePermission.allowed,
    })
  }, [card, diceKept, markScorePermission])
}
