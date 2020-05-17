import React from "react"

export const CardArea = ({ cardDeck, cardDrawn, drawCard, card }) => {
  return (
    <div className="card-area">
      <div className="remaining-cards-number">{cardDeck.length}</div>
      {card.label && cardDrawn && (
        <div className="card current-card">
          <img src={`src/Cards/assets/card_${card.label}.png`} alt={card.label} />
        </div>
      )}
      <div
        className="card default-card"
        style={{ backgroundImage: "url('src/Cards/assets/card_default.png')" }}
      >
        {!cardDrawn && (
          <button className="draw-card-btn" onClick={() => drawCard()}>
            {cardDeck.length > 0 ? "Draw a card" : "Shuffle the deck"}
          </button>
        )}
      </div>
    </div>
  )
}
