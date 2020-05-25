import React from "react"

import { useGameState } from "src/game.store.js"
import { useDrawCard, useShuffleDeck } from "src/game.actions.js"

import { cardColors, isSwordChallengeCard } from "src/Cards/cards.js"
import { ButtonNextRound } from "src/Header/ButtonNextRound.js"

export const Header = () => {
  return (
    <div className="header">
      <SmallCard />
      <ButtonNextRound />
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
      <span>{totalScore}</span>
    </div>
  )
}
