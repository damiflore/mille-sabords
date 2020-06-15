import React from "react"

import { useCurrentCard, useCardDeck, useTotalScore } from "src/game.store.js"
import { useDrawCard, useShuffleDeck } from "src/cards/cards.actions.js"
import { cardColors, isSwordChallengeCard } from "src/cards/cards.js"
import { Dialog } from "src/dialog/Dialog.jsx"

import { SwordChallengeIndicator } from "./SwordChallengeIndicator.jsx"

export const Header = () => {
  return (
    <div className="header">
      <div className="card-container">
        <SmallCard />
        <SwordChallengeIndicator />
      </div>
      <TotalScore />
    </div>
  )
}

const SmallCard = () => {
  return (
    <div className="small-card">
      <TopDeckCard />
      <DeckButton />
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

const DeckButton = () => {
  const currentCard = useCurrentCard()
  const cardDeck = useCardDeck()

  if (currentCard) return null

  if (cardDeck.length === 0) return <ShuffleDeckButton />

  return <DrawCardButton />
}

const DrawCardButton = () => {
  const drawCard = useDrawCard()

  return (
    <button className="draw-card-btn" onClick={drawCard}>
      Piocher
    </button>
  )
}

const ShuffleDeckButton = () => {
  const shuffleDeck = useShuffleDeck()

  return (
    <button className="draw-card-btn" onClick={shuffleDeck}>
      Shuffle deck
    </button>
  )
}

const TotalScore = () => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false)

  const openDialog = () => {
    setDialogIsOpen(true)
  }

  const closeDialog = () => {
    setDialogIsOpen(false)
  }

  const totalScore = useTotalScore()
  return (
    <div className="total-score">
      {/* this span below should become a button now it has onClick behaviour */}
      <span
        onClick={() => {
          openDialog()
        }}
        className="score"
      >
        {totalScore}
      </span>
      <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={true}>
        <div>Total score dialog content</div>
      </Dialog>
    </div>
  )
}
