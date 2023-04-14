/* eslint-disable import/max-dependencies */
import React from "react"

import { useBecomes } from "/app/hooks.js"
import { useSignal, useSignalState } from "/app/helper/signal.js"
import {
  useCurrentCardId,
  useCurrentCardActivated,
  useScoreMarked,
  useAnimationsDisabled,
} from "/app/main.store.js"
import {
  useRoundScore,
  useSymbolsInChest,
  useSwordQuantityRequired,
} from "/app/round/round.selectors.js"
import { ValueWithAnimatedTransition } from "/app/animation/ValueWithAnimatedTransition.jsx"

import {
  cardIdToCard,
  isPirateCard,
  isSwordChallengeCard,
} from "/app/cards/cards.js"
import { useDialogState } from "/app/dialog/dialog.component.jsx"

import { SYMBOL_SWORD } from "/app/symbols/symbols.js"
import { countSymbol } from "/app/round/computeRoundScore.js"
import { StarRain } from "/app/game-design/StarRain.jsx"
import { RoundScoreRulesDialog } from "/app/round/RoundScoreRulesDialog.jsx"
import { useScoreParticles } from "/app/score/useScoreParticles.js"
import { RoundScoreParticle } from "/app/round/RoundScoreParticle.jsx"
import { useRoundScoreParticleEffects } from "/app/round/useRoundScoreParticleEffects.js"

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
  const [scoreDialogIsOpen, openScoreDialog, closeScoreDialog] =
    useDialogState()

  const animationsDisabled = useAnimationsDisabled()

  return (
    <>
      {isPirateCard(currentCard) ? <DoubleScoreIndicator /> : null}
      {scoreMarked ? <StarRain /> : null}
      <button
        className={`round-score ${swordChallengeOngoing ? "hidden" : ""}`}
        onClick={openScoreDialog}
      >
        {animationsDisabled ? (
          <ScoreWithoutAnimation />
        ) : (
          <ScoreWithAnimations />
        )}
      </button>
      {isSwordChallengeCard(currentCard) ? <NegativeScoreSign /> : null}
      <RoundScoreRulesDialog
        dialogIsOpen={scoreDialogIsOpen}
        closeDialog={closeScoreDialog}
      />
    </>
  )
}

const ScoreWithAnimations = () => {
  const roundScore = useRoundScore()
  const roundScoreDomNodeRef = React.useRef()
  const [scoreParticleMergedListener, scoreParticleMergedEmitter] = useSignal()
  const [scoreParticles, addScoreParticle, scoreDisplayed] = useScoreParticles({
    totalScore: roundScore,
    onScoreParticleMerged: scoreParticleMergedEmitter,
  })

  useRoundScoreParticleEffects({ addScoreParticle })
  useScoreParticleMergeEffect({
    roundScoreDomNodeRef,
    scoreParticleMergedListener,
  })

  const minDelayBetweenParticles = 600
  const lastScoreParticleMsRef = React.useRef(null)
  const animationDelayGetter = () => {
    const lastScoreParticleMs = lastScoreParticleMsRef.current
    const animationDelay = scoreParticleAnimationDelayGetter(
      lastScoreParticleMs,
      minDelayBetweenParticles,
    )
    lastScoreParticleMsRef.current = Date.now() + animationDelay
    return animationDelay
  }

  return (
    <>
      <span ref={roundScoreDomNodeRef} className="round-score--value">
        <ValueWithAnimatedTransition
          value={scoreDisplayed}
          condition={(value, previousValue) => value > previousValue}
          duration={600}
        />
      </span>
      {scoreParticles.map((scoreParticle) => {
        return (
          <RoundScoreParticle
            key={scoreParticle.id}
            totalScoreDomNodeRef={roundScoreDomNodeRef}
            scoreParticle={scoreParticle}
            animationDelayGetter={animationDelayGetter}
          />
        )
      })}
    </>
  )
}

const scoreParticleAnimationDelayGetter = (
  lastScoreParticleMs,
  minDelayBetweenParticles,
) => {
  if (!lastScoreParticleMs) {
    return 0
  }

  const nowMs = Date.now()
  const msEllapsedSinceLastParticle = nowMs - lastScoreParticleMs
  const msToWait = minDelayBetweenParticles - msEllapsedSinceLastParticle
  if (msToWait <= 0) {
    return 0
  }

  return msToWait
}

const ScoreWithoutAnimation = () => {
  const roundScore = useRoundScore()
  return <span className="round-score--value">{roundScore}</span>
}

const useScoreParticleMergeEffect = ({
  roundScoreDomNodeRef,
  scoreParticleMergedListener,
}) => {
  const scoreParticleMerged = useSignalState(scoreParticleMergedListener)

  React.useEffect(() => {
    if (!scoreParticleMerged) {
      return undefined
    }
    const roundScoreDomNode = roundScoreDomNodeRef.current
    return animateScoreParticleMerge({
      roundScoreDomNode,
    })
  }, [scoreParticleMerged])
}

const animateScoreParticleMerge = ({
  roundScoreDomNode,
  duration = 500,
  easing = "ease-in-out",
}) => {
  const animation = roundScoreDomNode.animate(
    [
      {
        transform: "scale(1.8)",
      },
    ],
    {
      duration,
      easing,
    },
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
            return (
              <div
                key={index}
                className={`rope rope-${index + 1} cut-rope`}
              ></div>
            )
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
        className={`negative-round-score rotate-${quantityKept} ${
          challengeWon ? "removed" : ""
        }`}
      >
        {roundScore}
      </div>
    </>
  )
}
