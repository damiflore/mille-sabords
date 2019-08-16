import React from "react"

export const CardArea = ({ cardDeck, cardDrawn, drawCard, currentCard }) => {
  return (
    <div>
      {!cardDrawn && (
        <button onClick={() => drawCard()} style={{ marginTop: "20px" }}>
          {cardDeck.length > 0 ? "Draw a card" : "Shuffle the deck"}
        </button>
      )}
      <div style={{ marginTop: "10px" }}>Remaining cards: {cardDeck.length}</div>
      <span className="card">{currentCard.label}</span>
    </div>
  )
}
