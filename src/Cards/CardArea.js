import React from "react"
import { useGameState } from "src/gameStore.js"

export const CardArea = ({ cardDeck, cardDrawn, shuffleDeck, drawCard, card }) => {
  return (
    <div className="card-area">
      <div className="remaining-cards-number">{cardDeck.length}</div>
      <CurrentCard />
      <div
        className="card default-card"
        style={{ backgroundImage: "url('src/Cards/assets/card_default.png')" }}
      >
        {!cardDrawn && (
          <button
            className="draw-card-btn"
            onClick={() => {
              if (cardDeck.length === 0) {
                shuffleDeck()
              } else {
                drawCard()
              }
            }}
          >
            {cardDeck.length > 0 ? "Draw a card" : "Shuffle the deck"}
          </button>
        )}
      </div>
    </div>
  )
}

const CurrentCard = () => {
  const { card, cardDrawn } = useGameState()

  if (!card) return null
  if (!cardDrawn) return null

  return (
    <div className="card current-card">
      <img src={`src/Cards/assets/card_${card}.png`} alt={card} />
    </div>
  )
}
