import React from "react"

import { useGameState } from "src/game.store.js"
import { useDrawCard, useShuffleDeck } from "src/game.actions.js"

import { cardColors, isSwordChallengeCard } from "src/cards/cards.js"
import { SwordChallengeIndicator } from "src/Header/SwordChallengeIndicator.jsx"

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
  const { card, cardDrawn } = useGameState()

  if (!card || !cardDrawn) return <BackCard />

  return <CurrentCard />
}

const BackCard = () => {
  return (
    <div
      className="card default-card"
      style={{
        backgroundImage: "url('src/Cards/assets/card_default.png')",
        backgroundSize: "217px",
      }}
    ></div>
  )
}

const CurrentCard = () => {
  const { card, cardDrawn } = useGameState()

  if (!card) return null
  if (!cardDrawn) return null

  return (
    <div
      className="card current-card"
      style={{
        backgroundColor: cardColors[card].color1,
        borderColor: cardColors[card].color2,
      }}
    >
      <img
        src={`src/Cards/assets/card_small-${
          isSwordChallengeCard(card) ? "sword-challenge" : card
        }.png`}
        alt={card}
      />
    </div>
  )
}

const DeckButton = () => {
  const { cardDrawn, cardDeck } = useGameState()

  if (cardDrawn) return null

  if (cardDeck.length === 0) return <ShuffleDeckButton />

  return <DrawCardButton />
}

const DrawCardButton = () => {
  const drawCard = useDrawCard()

  return (
    <button className="draw-card-btn" onClick={drawCard}>
      Draw a card
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
  const { totalScore } = useGameState()
  return (
    <div className="total-score">
      <span className="score">{totalScore}</span>
    </div>
  )
}
