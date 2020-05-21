import React from "react"
import { useGameStore } from "src/MilleSabordGame.js"
import {
  isTwoSwordsChallengeCard,
  isThreeSwordsChallengeCard,
  isFourSwordsChallengeCard,
  isWitchCard,
} from "src/Cards/cards.js"
import { markScore } from "src/game.actions.js"
import { countSkulls } from "src/Dice/countSkulls.js"
import { computeIsOnSkullIsland } from "src/SkullIsland/computeIsOnSkullIsland.js"
import { computeRollDicePermission } from "src/Dice/computeRollDicePermission.js"
import { computeMarkScorePermission } from "./Score/computeMarkScorePermission.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"

const { useEffect, useRef } = React

export const GameLogic = () => {
  useAutoMarkScore()
  useSkullAndScoreMarked()
  useSkullIsland()
  useRollDicePermission()
  useMarkScorePermission()
  useRoundScore()
  useNextRoundPermission()
  useCanRemoveSkull()
  return null
}

// auto mark score for failed sword challenges
const useAutoMarkScore = () => {
  const store = useGameStore()
  const { markScorePermission, card, scoreMarked } = store

  const markScorePermissionPreviousValue = usePrevious(markScorePermission)
  useEffect(() => {
    const isSwordChallengeCard =
      isTwoSwordsChallengeCard(card) ||
      isThreeSwordsChallengeCard(card) ||
      isFourSwordsChallengeCard(card)
    if (
      isSwordChallengeCard &&
      !scoreMarked &&
      markScorePermissionPreviousValue.allowed &&
      !markScorePermission.allowed
    ) {
      markScore(store)
    }
  }, [card, scoreMarked, markScorePermissionPreviousValue, markScorePermission])
}

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// this is a kind of derived state (it should not be an effect)
const useSkullAndScoreMarked = () => {
  const { card, diceCursed, scoreMarked, setKeepDiceAllowed, setUnkeepDiceAllowed } = useGameStore()

  useEffect(() => {
    const skullCount = countSkulls({ card, diceCursed })
    if (skullCount > 2 || scoreMarked) {
      setKeepDiceAllowed(false)
      setUnkeepDiceAllowed(false)
    } else {
      setKeepDiceAllowed(true)
      setUnkeepDiceAllowed(true)
    }
  }, [card, diceCursed, scoreMarked])
}

// isOnSkullIsland
const useSkullIsland = () => {
  const { setIsOnSkullIsland, isOnSkullIsland, card, rollIndex, diceCursed } = useGameStore()

  useEffect(() => {
    setIsOnSkullIsland(
      computeIsOnSkullIsland({
        isOnSkullIsland,
        card,
        rollIndex,
        diceCursed,
      }),
    )
  }, [card, rollIndex, diceCursed])
}

// rollDicePermission (derived state aussi non ?)
const useRollDicePermission = () => {
  const { setRollDicePermission, cardDrawn, scoreMarked, card, diceCursed } = useGameStore()

  useEffect(() => {
    setRollDicePermission(
      computeRollDicePermission({
        cardDrawn,
        scoreMarked,
        card,
        diceCursed,
      }),
    )
  }, [cardDrawn, scoreMarked, card, diceCursed])
}

// markScorePermission (derived state aussi non ?)
const useMarkScorePermission = () => {
  const { setMarkScorePermission, rollIndex, scoreMarked, card, diceCursed } = useGameStore()

  useEffect(() => {
    setMarkScorePermission(
      computeMarkScorePermission({
        rollIndex,
        card,
        diceCursed,
        scoreMarked,
      }),
    )
  }, [card, rollIndex, diceCursed, scoreMarked])
}

// roundScore (derived state aussi non ?)
const useRoundScore = () => {
  const { setRoundScore, card, diceKept, markScorePermission } = useGameStore()

  useEffect(() => {
    setRoundScore(
      computeRoundScore({
        card,
        diceKept,
        markScoreAllowed: markScorePermission.allowed,
      }),
    )
  }, [card, diceKept, markScorePermission])
}

// nextRoundPermission (derived state aussi non ?)
const useNextRoundPermission = () => {
  const {
    rollIndex,
    setNextRoundPermission,
    rollDicePermission,
    markScorePermission,
  } = useGameStore()

  useEffect(() => {
    if (rollIndex === -1) {
      setNextRoundPermission({ allowed: false })
    } else if (!rollDicePermission.allowed && !markScorePermission.allowed) {
      setNextRoundPermission({ allowed: true })
    }
  }, [rollIndex, rollDicePermission, markScorePermission])
}

// canRemoveSkull (derived state aussi non ?)
const useCanRemoveSkull = () => {
  const { setCanRemoveSkull, cardEffectUsed, card, diceCursed } = useGameStore()

  useEffect(() => {
    if (isWitchCard(card)) {
      if (diceCursed.length > 2) {
        setCanRemoveSkull(false)
      } else if (cardEffectUsed) {
        setCanRemoveSkull(false)
      } else {
        setCanRemoveSkull(true)
      }
    } else {
      setCanRemoveSkull(false)
    }
  }, [card, diceCursed])
}
