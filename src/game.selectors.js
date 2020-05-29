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
  useDices,
} from "src/game.store.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import {
  isWitchCard,
  isChestCard,
  isCoinCard,
  isDiamondCard,
  isOneSkullCard,
  isTwoSkullsCard,
} from "src/cards/cards.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"
import { symbolIsSkull, SYMBOL_COIN, SYMBOL_DIAMOND, SYMBOL_SKULL } from "src/symbols/symbols.js"

const { useMemo } = React

export const useSymbolsFromCard = ({ card = useCard() } = {}) => {
  if (isCoinCard(card)) return [SYMBOL_COIN]
  if (isDiamondCard(card)) return [SYMBOL_DIAMOND]
  if (isOneSkullCard(card)) return [SYMBOL_SKULL]
  if (isTwoSkullsCard(card)) return [SYMBOL_SKULL, SYMBOL_SKULL]
  return []
}

export const useSymbolsFromDiceKept = ({ dicesInKeptArea = useDicesInKeptArea() } = {}) => {
  return dicesInKeptArea.map((dice) => diceToVisibleSymbol(dice))
}

export const useDicesInKeptArea = ({ diceKept = useDiceKept(), dices = useDices() } = {}) => {
  return diceKept.map((diceKeptId) => dices.find((dice) => dice.id === diceKeptId))
}

export const useDicesInRolledArea = ({ diceRolled = useDiceRolled(), dices = useDices() } = {}) => {
  return diceRolled.map((diceRolledId) => dices.find((dice) => dice.id === diceRolledId))
}

export const useDicesInCursedArea = ({ diceCursed = useDiceCursed(), dices = useDices() } = {}) => {
  return diceCursed.map((diceCursedId) => dices.find((dice) => dice.id === diceCursedId))
}

export const useRemainingSpotInCursedArea = ({
  skullCountInCursedArea = useSkullCountInCursedArea(),
} = {}) => {
  return 3 - skullCountInCursedArea
}

export const useHasDicesToCurse = ({ dicesToCurse = useDicesToCurse() } = {}) => {
  return dicesToCurse.length > 0
}

export const useDicesToCurse = ({
  dicesInRolledArea = useDicesInRolledArea(),
  witchUncursedDiceId = useWitchUncursedDiceId(),
  remainingSpotInCursedArea = useRemainingSpotInCursedArea(),
} = {}) => {
  return dicesInRolledArea
    .filter((dice) => diceIsOnSkull(dice) && dice.id !== witchUncursedDiceId)
    .slice(0, remainingSpotInCursedArea)
}

export const useRollDiceAllowed = ({
  cardDrawn = useCardDrawn(),
  rollIndex = useRollIndex(),
  diceRolled = useDiceRolled(),
  scoreMarked = useScoreMarked(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
  hasDicesToCurse = useHasDicesToCurse(),
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

  if (threeSkullsOrMoreInCursedArea) {
    return false
  }

  if (hasDicesToCurse) {
    return false
  }

  if (diceRolled.length < 2) {
    return false
  }

  return true
}

export const useThreeSkullsOrMoreInCursedArea = ({
  skullCountInCursedArea = useSkullCountInCursedArea(),
} = {}) => {
  return skullCountInCursedArea > 2
}

export const useSkullCountInCursedArea = ({
  diceCursed = useDiceCursed(),
  symbolsFromCard = useSymbolsFromCard(),
} = {}) => {
  return diceCursed.length + symbolsFromCard.filter((symbol) => symbolIsSkull(symbol))
}

export const useRemoveSkullAllowed = ({
  witchUncursedDiceId = useWitchUncursedDiceId(),
  card = useCard(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
} = {}) => {
  if (!isWitchCard(card)) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    return false
  }

  if (witchUncursedDiceId) {
    return false
  }

  return true
}

export const useKeepDiceAllowed = ({
  scoreMarked = useScoreMarked(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    return false
  }

  return true
}

export const useUnkeepDiceAllowed = ({
  scoreMarked = useScoreMarked(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    return false
  }

  return true
}

export const useMarkScoreAllowed = ({
  rollIndex = useRollIndex(),
  scoreMarked = useScoreMarked(),
  card = useCard(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
  hasDicesToCurse = useHasDicesToCurse(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    if (isChestCard(card) && rollIndex > 0) {
      return true
    }

    return false
  }

  if (hasDicesToCurse) {
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
  symbolsFromDiceKept = useSymbolsFromDiceKept(),
  scoreMarked = useScoreMarked(),
  markScoreAllowed = useMarkScoreAllowed(),
} = {}) => {
  return useMemo(
    () =>
      computeRoundScore({
        card,
        symbolsFromDiceKept,
        scoreMarked,
        markScoreAllowed,
      }),
    [card, symbolsFromDiceKept, scoreMarked, markScoreAllowed],
  )
}
