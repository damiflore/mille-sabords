import React from "react"

import { useGameState } from "src/game.store.js"
import {
  threeSkullOrMoreInCursedAreaSelector,
  skullsInRolledAreaSelector,
  skullCountInCursedAreaSelector,
  remainingSpotInCursedAreaSelector,
  roundScoreSelector,
} from "src/game.selectors.js"
import { useMarkScore, useCurseDice, useSendToSkullIsland } from "src/game.actions.js"

import { isSwordChallengeCard } from "src/Cards/cards.js"

const { useEffect, useRef } = React

export const GameEffects = () => {
  useCurseDiceEffect()
  useFailSwordChallengeEffect()
  useFourSkullsOrMoreOnFirstRollEffect()
  return null
}

const useCurseDiceEffect = () => {
  const state = useGameState()
  const { rollIndex } = state
  const curseDice = useCurseDice()
  const skullsInRolledArea = skullsInRolledAreaSelector(state)
  const remainingSpotInCursedArea = remainingSpotInCursedAreaSelector(state)

  useEffect(() => {
    if (!remainingSpotInCursedArea) {
      return () => {}
    }
    const diceToCurse = skullsInRolledArea.slice(0, remainingSpotInCursedArea)
    const timeout = setTimeout(() => {
      diceToCurse.forEach((dice) => {
        curseDice(dice)
      })
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [skullsInRolledArea, remainingSpotInCursedArea, rollIndex])
}

// auto mark score for failed sword challenges
const useFailSwordChallengeEffect = () => {
  const state = useGameState()
  const { card, scoreMarked } = state
  const markScore = useMarkScore()
  const threeSkullsOrMoreInCursedArea = threeSkullOrMoreInCursedAreaSelector(state)
  const threeSkullsOrMoreInCursedAreaPrevious = usePrevious(threeSkullsOrMoreInCursedArea)
  const roundScore = roundScoreSelector(state)

  useEffect(() => {
    if (
      isSwordChallengeCard(card) &&
      !scoreMarked &&
      !threeSkullsOrMoreInCursedAreaPrevious &&
      threeSkullsOrMoreInCursedArea
    ) {
      markScore(roundScore)
    }
  }, [
    card,
    scoreMarked,
    threeSkullsOrMoreInCursedAreaPrevious,
    threeSkullsOrMoreInCursedArea,
    roundScore,
  ])
}

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// go to skull island if 4 skulls or more on first roll
const useFourSkullsOrMoreOnFirstRollEffect = () => {
  const state = useGameState()
  const { isOnSkullIsland, card, rollIndex } = state
  const sendToSkullIsland = useSendToSkullIsland()
  const skullCountInCursedArea = skullCountInCursedAreaSelector(state)

  useEffect(() => {
    if (rollIndex !== 0) return

    if (isOnSkullIsland) return

    if (isSwordChallengeCard(card)) return

    if (skullCountInCursedArea < 4) return

    sendToSkullIsland()
  }, [rollIndex, isOnSkullIsland, skullCountInCursedArea, card])
}
