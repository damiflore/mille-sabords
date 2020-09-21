import React from "react"

import { useCurrentCard } from "src/main.store.js"
import { useCurrentPlayer } from "src/round/round.selectors.js"
import { cardColors, isSwordChallengeCard } from "src/cards/cards.js"
import { CardRulesDialog } from "src/header/CardRulesDialog.jsx"
import { SwordChallengeIndicator } from "./SwordChallengeIndicator.jsx"

import { useOpenScoreBoard } from "src/game/Game.jsx"
import { useAnimateTransitionUsingJs } from "src/animation/useAnimateTransition.js"

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
  const totalScoreAnimation = useAnimateTransitionUsingJs(totalScore, {
    duration: 2000,
    timingFunction: (progress) => 1 - Math.pow(1 - progress, 5),
  })

  return (
    <div className="total-score" onClick={openScoreBoard}>
      <span
        className="score"
        style={{
          backgroundColor: (player && player.character.color) || "white",
        }}
      >
        {totalScoreAnimation ? totalScoreAnimation.value : totalScore}
      </span>
    </div>
  )
}
