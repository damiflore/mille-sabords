import React from "react"

import { useCurrentCard } from "src/main.store.js"
import { useCurrentPlayer } from "src/round/round.selectors.js"
import { cardColors, isSwordChallengeCard } from "src/cards/cards.js"
import { CardRulesDialog } from "src/header/CardRulesDialog.jsx"
import { SwordChallengeIndicator } from "./SwordChallengeIndicator.jsx"

import { useOpenScoreBoard } from "src/game/Game.jsx"
import { startJavaScriptAnimation } from "src/helper/animation.js"
import { usePrevious } from "../hooks.js"

const { useEffect, useState } = React

export const Header = () => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
  const card = useCurrentCard()

  const openDialog = () => {
    if (card) setDialogIsOpen(true)
  }

  const closeDialog = () => {
    setDialogIsOpen(false)
  }

  return (
    <div className="header">
      <div
        className="card-container"
        onClick={() => {
          openDialog()
        }}
      >
        <div className="small-card">
          <TopDeckCard />
        </div>
        <SwordChallengeIndicator />
      </div>
      <CurrentPlayer />
      <TotalScore />
      <CardRulesDialog dialogIsOpen={dialogIsOpen} closeDialog={closeDialog} />
    </div>
  )
}

const TopDeckCard = () => {
  const currentCard = useCurrentCard()

  return currentCard ? <Card card={currentCard} /> : <BackCard />
}

const BackCard = () => {
  return (
    <div
      className="card default-card"
      style={{
        backgroundImage: "url('/src/cards/card_default.png')",
        backgroundSize: "217px",
      }}
    ></div>
  )
}

const Card = ({ card }) => {
  return (
    <div
      className="card current-card"
      style={{
        backgroundColor: cardColors[card].color1,
        borderColor: cardColors[card].color2,
      }}
    >
      <img
        src={`/src/cards/card_small-${isSwordChallengeCard(card) ? "sword-challenge" : card}.png`}
        alt={card}
      />
    </div>
  )
}

const CurrentPlayer = () => {
  const player = useCurrentPlayer()
  const openScoreBoard = useOpenScoreBoard()

  return (
    <img
      onClick={openScoreBoard}
      className="avatar"
      src={`src/score-board/${player && player.character.img}`}
      alt="player"
      style={{
        borderColor: (player && player.character.color) || "white",
      }}
    />
  )
}

const TotalScore = () => {
  const player = useCurrentPlayer()
  const openScoreBoard = useOpenScoreBoard()

  const totalScore = player.score
  const totalScorePrevious = usePrevious(totalScore)

  const [totalScoreAnimated, totalScoreAnimatedSetter] = useState(null)
  const [totalScoreTransition, totalScoreTransitionSetter] = useState(null)

  useEffect(() => {
    if (totalScore !== totalScorePrevious) {
      totalScoreTransitionSetter({ from: totalScorePrevious, to: totalScore })
    }
  }, [totalScore, totalScorePrevious])

  useEffect(() => {
    if (totalScoreTransition) {
      return startJavaScriptAnimation({
        duration: 2000,
        // easeOutQuint
        timingFunction: (progress) => 1 - Math.pow(1 - progress, 5),
        onProgress: ({ progress }) => {
          totalScoreAnimatedSetter(
            Math.round(
              totalScoreTransition.from +
                (totalScoreTransition.to - totalScoreTransition.from) * progress,
            ),
          )
        },
        onComplete: () => {
          totalScoreTransitionSetter(null)
          totalScoreAnimatedSetter(null)
        },
      })
    }
    return () => {}
  }, [totalScoreTransition])

  const totalScoreDisplayed = totalScoreAnimated === null ? totalScore : totalScoreAnimated

  return (
    <div className="total-score" onClick={openScoreBoard}>
      <span
        className="score"
        style={{
          backgroundColor: (player && player.character.color) || "white",
        }}
      >
        {totalScoreDisplayed}
      </span>
    </div>
  )
}
