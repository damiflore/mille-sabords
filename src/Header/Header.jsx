import React from "react"
import { useGameStore } from "src/MilleSabordGame.js"
import { cardColors, isSwordChallengeCard } from "src/Cards/cards.js"
import { ButtonNextRound } from "src/ButtonNextRound.js"

export const Header = () => {
  return (
    <div className="header">
      <SmallCard />
      <ButtonNextRound />
      <TotalScore />
    </div>
  )
}

// to be removed
const drawCard = ({ cardDeck, cardsUsed, setCard, setCardDeck, setCardDrawn, setCardsUsed }) => {
  setCardDrawn(true)
  const cardDrawn = cardDeck[0]
  setCardsUsed([...cardsUsed, cardDrawn])
  setCard(cardDeck[0])
  setCardDeck(cardDeck.slice(1))
}

const SmallCard = () => {
  const store = useGameStore()
  const { cardDeck, cardDrawn, card } = store
  return (
    <div className="small-card">
      {card && cardDrawn ? (
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
      ) : (
        <>
          <div
            className="card default-card"
            style={{
              backgroundImage: "url('src/Cards/assets/card_default.png')",
              backgroundSize: "217px",
            }}
          ></div>
        </>
      )}
      <button className="draw-card-btn" onClick={() => drawCard(store)}>
        {cardDeck.length > 0 ? "Draw a card" : "Shuffle the deck"}
      </button>
    </div>
  )
}

const TotalScore = () => {
  const { totalScore } = useGameStore()
  return (
    <div className="total-score">
      <span>{totalScore}</span>
    </div>
  )
}
