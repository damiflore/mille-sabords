import React from "react"

import { useCurrentCard, useCurrentPlayerGettingReady } from "src/main.store.js"
import { useCurrentPlayer } from "src/round/round.selectors.js"
import { cardColors, isSwordChallengeCard } from "src/cards/cards.js"
import { CardRulesDialog } from "src/header/CardRulesDialog.jsx"
import { SwordChallengeIndicator } from "./SwordChallengeIndicator.jsx"

import { useAnimateTransitionUsingJs } from "src/animation/useAnimateTransition.js"

export const Header = ({ openScoreboard }) => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)
  const card = useCurrentCard()
  const currentPlayerGettingReady = useCurrentPlayerGettingReady()

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
        {!currentPlayerGettingReady && <SwordChallengeIndicator />}
      </div>
      <CurrentPlayer openScoreboard={openScoreboard} />
      <TotalScore />
      <CardRulesDialog dialogIsOpen={dialogIsOpen} closeDialog={closeDialog} />
    </div>
  )
}

const TopDeckCard = () => {
  const currentCard = useCurrentCard()
  const currentPlayerGettingReady = useCurrentPlayerGettingReady()

  return currentCard && !currentPlayerGettingReady ? <SmallCard card={currentCard} /> : <BackCard />
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

export const SmallCard = ({ card }) => {
  return (
    <div
      className="card current-card"
      id="small-card"
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

const CurrentPlayer = ({ openScoreboard }) => {
  const player = useCurrentPlayer()

  return (
    <img
      onClick={openScoreboard}
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
  const totalScore = player.score
  const totalScoreAnimation = useAnimateTransitionUsingJs(totalScore, {
    duration: 1200,
    timingFunction: (progress) => 1 - Math.pow(1 - progress, 5),
  })

  return (
    <div className="total-score">
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
