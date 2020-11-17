/* eslint-disable import/max-dependencies */
import React from "react"

import { useSignalState } from "src/helper/signal.js"
import { useCurrentCardId, useCurrentCardActivated, useScoreMarked } from "src/main.store.js"
import { useRoundScore, useSymbolsInChest } from "src/round/round.selectors.js"
import { useAnimateTransitionUsingJs } from "src/animation/useAnimateTransition.js"

import { cardIdToCard, isPirateCard, isSwordChallengeCard } from "src/cards/cards.js"
import { useDialogState } from "src/dialog/dialog.jsx"
import { useBecomes } from "src/hooks.js"
import { SYMBOL_SWORD } from "src/symbols/symbols.js"
import { useSwordQuantityRequired } from "src/header/SwordChallengeIndicator.jsx"
import { countSymbol } from "src/score/computeRoundScore.js"
import { StarRain } from "src/game-design/StarRain.jsx"
import { ScoreRulesDialog } from "src/score/score.dialog.jsx"

const { useState, useEffect } = React

export const RoundScore = () => {
  const currentCard = cardIdToCard(useCurrentCardId())
  const swordChallengeOngoing = useSwordChallengeOngoing()

  return (
    <div className={`score-area ${swordChallengeOngoing ? "animated" : ""}`}>
      {currentCard ? <ScoreDisplay /> : null}
    </div>
  )
}

const useSwordChallengeOngoing = () => {
  const currentCard = cardIdToCard(useCurrentCardId())
  const symbolsInChest = useSymbolsInChest()
  const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD)
  const quantityRequired = useSwordQuantityRequired()

  if (!isSwordChallengeCard(currentCard)) {
    return false
  }

  const challengeWon = quantityKept >= quantityRequired
  return !challengeWon
}

const ScoreDisplay = ({ roundScoreDomNodeRef, particleMergedListener }) => {
  const roundScore = useRoundScore()
  const currentCard = cardIdToCard(useCurrentCardId())
  const scoreMarked = useScoreMarked()
  const swordChallengeOngoing = useSwordChallengeOngoing()

  const [scoreDialogIsOpen, openScoreDialog, closeScoreDialog] = useDialogState()
  const particleMerged = particleMergedListener ? useSignalState(particleMergedListener) : false

  React.useEffect(() => {
    if (!particleMerged) {
      return undefined
    }
    const roundScoreDomNode = roundScoreDomNodeRef.current
    return animateParticleMerge({
      roundScoreDomNode,
      duration: 300,
    })
  }, [particleMerged])

  const roundScoreAnimatedValue = useAnimateTransitionUsingJs(roundScore, { duration: 600 })

  return (
    <>
      {isPirateCard(currentCard) ? <DoubleScoreIndicator /> : null}
      {scoreMarked ? <StarRain /> : null}
      <button
        ref={roundScoreDomNodeRef}
        className={`round-score ${swordChallengeOngoing ? "hidden" : ""}`}
        onClick={openScoreDialog}
      >
        <span className="round-score--value">
          {roundScoreAnimatedValue ? roundScoreAnimatedValue.value : roundScore}
        </span>
      </button>
      {isSwordChallengeCard(currentCard) ? <NegativeScoreSign /> : null}
      <ScoreRulesDialog dialogIsOpen={scoreDialogIsOpen} closeDialog={closeScoreDialog} />
    </>
  )
}

const animateParticleMerge = ({ roundScoreDomNode, duration }) => {
  const animation = roundScoreDomNode.animate(
    [
      {
        transform: "scale(1.5)",
      },
    ],
    { duration },
  )
  return () => {
    animation.cancel()
  }
}

const DoubleScoreIndicator = () => {
  const currentCardActivated = useCurrentCardActivated()
  if (!currentCardActivated) {
    return <div style={{ display: "none" }} className="pirate-hook"></div>
  }
  return <div className="pirate-hook"></div>
}

const NegativeScoreSign = () => {
  const roundScore = useRoundScore()

  const symbolsInChest = useSymbolsInChest()
  const quantityKept = countSymbol(symbolsInChest, SYMBOL_SWORD)
  const quantityRequired = useSwordQuantityRequired()
  const quantityRequiredArray = new Array(quantityRequired).fill("")
  const challengeWon = quantityKept >= quantityRequired

  const swordNumberIncreased = useBecomes(
    (quantityKeptPrevious) => quantityKeptPrevious < quantityKept,
    [quantityKept],
  )

  const [swordSliceAnimation, swordSliceAnimationSetter] = useState(false)

  useEffect(() => {
    if (swordNumberIncreased) {
      swordSliceAnimationSetter(true)
    }
  }, [swordNumberIncreased])

  useEffect(() => {
    if (swordSliceAnimation) {
      const timeout = setTimeout(() => {
        swordSliceAnimationSetter(false)
      }, 300)
      return () => {
        clearTimeout(timeout)
      }
    }
    return () => {}
  }, [swordSliceAnimation])

  return (
    <>
      <div className={`ropes ${challengeWon ? "challenge-won" : ""}`}>
        {quantityRequiredArray.map((value, index) => {
          if (quantityKept >= index + 1)
            return <div key={index} className={`rope rope-${index + 1} cut-rope`}></div>
          return <div key={index} className={`rope rope-${index + 1}`}></div>
        })}
      </div>
      {swordSliceAnimation && quantityKept <= quantityRequired ? (
        <div className="sword-slice">
          <div className="triangle-left"></div>
          <div className="triangle-right"></div>
        </div>
      ) : null}
      <div
        className={`negative-round-score rotate-${quantityKept} ${challengeWon ? "removed" : ""}`}
      >
        {roundScore}
      </div>
    </>
  )
}
