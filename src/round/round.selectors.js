import React from "react"

import {
  useRollCount,
  useWitchUncursedDiceId,
  useCurrentCardId,
  useScoreMarked,
  useDiceIds,
  useDiceRolledIds,
  useDiceCursedIds,
  useChestSlots,
  useCurrentPlayerId,
  usePlayers,
} from "src/main.store.js"
import { diceIsOnSkull, diceToVisibleSymbol, diceIdToDice } from "src/dices/dices.js"
import {
  cardIdToCard,
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

export const useSymbolsInChest = ({
  diceIds = useDiceIds(),
  chestSlots = useChestSlots(),
} = {}) => {
  return Object.keys(chestSlots).reduce((previous, chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]

    if (chestSlotContent && chestSlotContent.type === "symbol") {
      return [...previous, chestSlotContent.value]
    }

    if (chestSlotContent && chestSlotContent.type === "dice") {
      const diceId = chestSlotContent.value
      const dice = diceIds.includes(diceId)
      return [...previous, diceToVisibleSymbol(dice.value)]
    }

    return previous
  }, [])
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
  diceRolledIds = useDiceRolledIds(),
  witchUncursedDiceId = useWitchUncursedDiceId(),
  remainingSpotInCursedArea = useRemainingSpotInCursedArea(),
} = {}) => {
  return diceRolledIds
    .filter((diceRolledId) => {
      if (diceRolledId === witchUncursedDiceId) return false
      const dice = diceIdToDice(diceRolledId)
      return diceIsOnSkull(dice)
    })
    .slice(0, remainingSpotInCursedArea)
}

export const useRollDiceAllowed = ({
  currentCardId = useCurrentCardId(),
  hasNeverRolled = useHasNeverRolled(),
  diceRolledIds = useDiceRolledIds(),
  scoreMarked = useScoreMarked(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
  hasDicesToCurse = useHasDicesToCurse(),
} = {}) => {
  if (!currentCardId) {
    return false
  }

  if (scoreMarked) {
    return false
  }

  if (hasNeverRolled) {
    return true
  }

  if (threeSkullsOrMoreInCursedArea) {
    return false
  }

  if (hasDicesToCurse) {
    return false
  }

  if (diceRolledIds.length < 2) {
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
  diceCursedIds = useDiceCursedIds(),
  symbolsFromCard = useSymbolsFromCard(),
} = {}) => {
  return diceCursedIds.length + symbolsFromCard.filter((symbol) => symbolIsSkull(symbol)).length
}

const useSymbolsFromCard = ({ currentCardId = useCurrentCardId() } = {}) => {
  const currentCard = cardIdToCard(currentCardId)
  if (isCoinCard(currentCard)) return [SYMBOL_COIN]
  if (isDiamondCard(currentCard)) return [SYMBOL_DIAMOND]
  if (isOneSkullCard(currentCard)) return [SYMBOL_SKULL]
  if (isTwoSkullsCard(currentCard)) return [SYMBOL_SKULL, SYMBOL_SKULL]
  return []
}

export const useMarkScoreButtonVisible = ({
  hasRolledOnce = useHasRolledOnce(),
  scoreMarked = useScoreMarked(),
  currentCardId = useCurrentCardId(),
  hasDicesToCurse = useHasDicesToCurse(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (hasDicesToCurse) {
    return false
  }

  if (!currentCardId) {
    return false
  }

  if (!hasRolledOnce) {
    return false
  }

  return true
}

export const useMarkScoreAllowed = ({
  hasRolledMoreThanOnce = useHasRolledMoreThanOnce(),
  scoreMarked = useScoreMarked(),
  currentCardId = useCurrentCardId(),
  threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea(),
  hasDicesToCurse = useHasDicesToCurse(),
} = {}) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    if (isChestCard(cardIdToCard(currentCardId)) && hasRolledMoreThanOnce) {
      return true
    }
    return false
  }

  if (hasDicesToCurse) {
    return false
  }

  if (!currentCardId) {
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
  currentCardId = useCurrentCardId(),
  symbolsInChest = useSymbolsInChest(),
  scoreMarked = useScoreMarked(),
  markScoreAllowed = useMarkScoreAllowed(),
} = {}) => {
  return useMemo(
    () =>
      computeRoundScore({
        card: cardIdToCard(currentCardId),
        symbolsInChest,
        scoreMarked,
        markScoreAllowed,
      }),
    [currentCardId, symbolsInChest, scoreMarked, markScoreAllowed],
  )
}
