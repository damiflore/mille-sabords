import React from "react"

import {
  useRollCount,
  useWitchUncursedDiceId,
  useCurrentCard,
  useScoreMarked,
  useDicesRolled,
  useDicesCursed,
  useChestSlots,
  useCurrentPlayerId,
  usePlayers,
} from "src/main.store.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import {
  isWitchCard,
  isChestCard,
  isCoinCard,
  isDiamondCard,
  isOneSkullCard,
  isTwoSkullsCard,
} from "src/cards/cards.js"
import { computeRoundScore } from "src/score/computeRoundScore.js"
import { symbolIsSkull, SYMBOL_COIN, SYMBOL_DIAMOND, SYMBOL_SKULL } from "src/symbols/symbols.js"

const { useMemo } = React

export const useCurrentPlayer = ({
  currentPlayerId = useCurrentPlayerId(),
  players = usePlayers(),
} = {}) => {
  return players.find((playerCandidate) => playerCandidate.id === currentPlayerId)
}

export const usePlayer = (playerId, { players = usePlayers() } = {}) =>
  players.find((playerCandidate) => playerCandidate.id === playerId)

export const useHasNeverRolled = ({ rollCount = useRollCount() } = {}) => rollCount === 0

export const useHasRolledOnce = ({ rollCount = useRollCount() } = {}) => rollCount > 0

export const useIsFirstRoll = ({ rollCount = useRollCount() } = {}) => rollCount === 1

export const useHasRolledMoreThanOnce = ({ rollCount = useRollCount() } = {}) => rollCount > 1

export const useSymbolsFromCard = ({ currentCard = useCurrentCard() } = {}) => {
  if (isCoinCard(currentCard)) return [SYMBOL_COIN]
  if (isDiamondCard(currentCard)) return [SYMBOL_DIAMOND]
  if (isOneSkullCard(currentCard)) return [SYMBOL_SKULL]
  if (isTwoSkullsCard(currentCard)) return [SYMBOL_SKULL, SYMBOL_SKULL]
  return []
}

export const useSymbolsInChest = ({ chestSlots = useChestSlots() } = {}) => {
  return Object.keys(chestSlots)
    .filter((chestSlot) => chestSlots[chestSlot])
    .map((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      if (chestSlotContent.type === "symbol") {
        return chestSlotContent.value
      }
      return diceToVisibleSymbol(chestSlotContent.value)
    })
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
  dicesRolled = useDicesRolled(),
  witchUncursedDiceId = useWitchUncursedDiceId(),
  remainingSpotInCursedArea = useRemainingSpotInCursedArea(),
} = {}) => {
  return dicesRolled
    .filter((dice) => diceIsOnSkull(dice) && dice.id !== witchUncursedDiceId)
    .slice(0, remainingSpotInCursedArea)
}

export const useRollDiceAllowed = ({
  currentCard = useCurrentCard(),
  hasNeverRolled = useHasNeverRolled(),
  scoreMarked = useScoreMarked(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
  hasDicesToCurse = useHasDicesToCurse(),
} = {}) => {
  if (!currentCard) {
    return false
  }

  if (scoreMarked) {
    return false
  }

  if (hasNeverRolled) {
    return true
  }

  if (threeSkullsOrMoreInCursedArea) {
    if (isChestCard(currentCard)) {
      return true
    }
    return false
  }

  if (hasDicesToCurse) {
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
  dicesCursed = useDicesCursed(),
  symbolsFromCard = useSymbolsFromCard(),
} = {}) => {
  return dicesCursed.length + symbolsFromCard.filter((symbol) => symbolIsSkull(symbol)).length
}

export const useRemoveSkullAllowed = ({
  witchUncursedDiceId = useWitchUncursedDiceId(),
  currentCard = useCurrentCard(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
} = {}) => {
  if (!isWitchCard(currentCard)) {
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

export const useMarkScoreButtonVisible = ({
  hasRolledOnce = useHasRolledOnce(),
  scoreMarked = useScoreMarked(),
  currentCard = useCurrentCard(),
  hasDicesToCurse = useHasDicesToCurse(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (hasDicesToCurse) {
    return false
  }

  if (!currentCard) {
    return false
  }

  if (!hasRolledOnce) {
    return false
  }

  return true
}

export const useMarkScoreAllowed = ({
  scoreMarked = useScoreMarked(),
  currentCard = useCurrentCard(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
  hasDicesToCurse = useHasDicesToCurse(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    if (isChestCard(currentCard)) {
      return true
    }
    return false
  }

  if (hasDicesToCurse) {
    return false
  }

  if (!currentCard) {
    return false
  }

  return true
}

export const useStartNextRoundAllowed = ({
  rollDiceAllowed = useRollDiceAllowed(),
  markScoreAllowed = useMarkScoreAllowed(),
  hasDicesToCurse = useHasDicesToCurse(),
} = {}) => {
  if (rollDiceAllowed) {
    return false
  }

  if (markScoreAllowed) {
    return false
  }

  if (hasDicesToCurse) {
    return false
  }

  return true
}

export const useRoundScore = ({
  currentCard = useCurrentCard(),
  symbolsInChest = useSymbolsInChest(),
  scoreMarked = useScoreMarked(),
  markScoreAllowed = useMarkScoreAllowed(),
} = {}) => {
  return useMemo(
    () =>
      computeRoundScore({
        card: currentCard,
        symbolsInChest,
        scoreMarked,
        markScoreAllowed,
      }),
    [currentCard, symbolsInChest, scoreMarked, markScoreAllowed],
  )
}
