/* eslint-disable import/max-dependencies */
import React from "react"

import { useBecomes } from "src/hooks.js"
import { useSignal, useSignalState } from "src/helper/signal.js"
import {
  useCurrentCardId,
  useCurrentCardActivated,
  useScoreMarked,
  useAnimationsDisabled,
} from "src/main.store.js"
import { useRoundScore, useSymbolsInChest } from "src/round/round.selectors.js"
import { ValueWithAnimatedTransition } from "src/animation/ValueWithAnimatedTransition.jsx"

import { cardIdToCard, isPirateCard, isSwordChallengeCard } from "src/cards/cards.js"
import { useDialogState } from "src/dialog/dialog.component.jsx"

import { SYMBOL_SWORD } from "src/symbols/symbols.js"
import { useSwordQuantityRequired } from "src/header/SwordChallengeIndicator.jsx"
import { countSymbol } from "src/round/computeRoundScore.js"
import { StarRain } from "src/game-design/StarRain.jsx"
import { RoundScoreRulesDialog } from "src/round/RoundScoreRulesDialog.jsx"
import { ScoreParticle, useScoreParticles } from "src/score/score.particle.jsx"
import { useRoundScoreParticleEffects } from "src/round/useRoundScoreParticleEffects.js"

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

const ScoreDisplay = () => {
  const currentCard = cardIdToCard(useCurrentCardId())
  const scoreMarked = useScoreMarked()
  const swordChallengeOngoing = useSwordChallengeOngoing()
  const [scoreDialogIsOpen, openScoreDialog, closeScoreDialog] = useDialogState()

  const animationsDisabled = useAnimationsDisabled()

  return (
    <>
      {isPirateCard(currentCard) ? <DoubleScoreIndicator /> : null}
      {scoreMarked ? <StarRain /> : null}
      <button
        className={`round-score ${swordChallengeOngoing ? "hidden" : ""}`}
        onClick={openScoreDialog}
      >
        {animationsDisabled ? <ScoreWithoutAnimation /> : <ScoreWithAnimations />}
      </button>
      {isSwordChallengeCard(currentCard) ? <NegativeScoreSign /> : null}
      <RoundScoreRulesDialog dialogIsOpen={scoreDialogIsOpen} closeDialog={closeScoreDialog} />
    </>
  )
}

const ScoreWithAnimations = () => {
  const roundScore = useRoundScore()
  const roundScoreDomNodeRef = React.useRef()
  const [scoreParticleMergedListener, scoreParticleMergedEmitter] = useSignal()
  const [scoreParticles, addScoreParticle, scoreDisplayed] = useScoreParticles({
    totalScore: roundScore,
    minDelayBetweenParticles: 600,
    scoreParticleAnimationDuration: 800,
    onScoreParticleMerged: scoreParticleMergedEmitter,
  })

  useRoundScoreParticleEffects({ addScoreParticle })
  useScoreParticleMergeEffect({ roundScoreDomNodeRef, scoreParticleMergedListener })

  return (
    <>
      <span className="round-score--value">
        <ValueWithAnimatedTransition
          value={scoreDisplayed}
          condition={(value, previousValue) => value > previousValue}
          duration={600}
        />
      </span>
      {scoreParticles.map((scoreParticle) => {
        return (
          <ScoreParticle
            key={scoreParticle.id}
            totalScoreDomNodeRef={roundScoreDomNodeRef}
            scoreParticle={scoreParticle}
          />
        )
      })}
    </>
  )
}

const ScoreWithoutAnimation = () => {
  const roundScore = useRoundScore()
  return <span className="round-score--value">{roundScore}</span>
}

const useScoreParticleMergeEffect = ({ roundScoreDomNodeRef, scoreParticleMergedListener }) => {
  const scoreParticleMerged = useSignalState(scoreParticleMergedListener)

  React.useEffect(() => {
    if (!scoreParticleMerged) {
      return undefined
    }
    const roundScoreDomNode = roundScoreDomNodeRef.current
    return animateScoreParticleMerge({
      roundScoreDomNode,
      duration: 300,
    })
  }, [scoreParticleMerged])
}

const animateScoreParticleMerge = ({ roundScoreDomNode, duration }) => {
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
