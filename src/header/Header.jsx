import React from "react"

import { useCurrentCard, useTotalScore } from "src/game.store.js"
import { cardColors, isSwordChallengeCard } from "src/cards/cards.js"

import { CardRulesDialog } from "src/header/CardRulesDialog.jsx"
import { SwordChallengeIndicator } from "./SwordChallengeIndicator.jsx"

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
        backgroundImage: "url('src/cards/card_default.png')",
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
        src={`src/cards/card_small-${isSwordChallengeCard(card) ? "sword-challenge" : card}.png`}
        alt={card}
      />
    </div>
  )
}

const TotalScore = () => {
  const totalScore = useTotalScore()
  return (
    <div className="total-score">
      <span className="score">{totalScore}</span>
    </div>
  )
}
