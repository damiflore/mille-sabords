import React from "react"
import { useGameStore } from "src/MilleSabordGame.js"

export const Header = () => {
  return (
    <div className="header">
      <SmallCard />
      <TotalScore />
    </div>
  )
}

const SmallCard = () => {
  const { cardDeck, cardDrawn, drawCard, card } = useGameStore()
  return (
    <div className="small-card">
      <div className="remaining-cards-number">{cardDeck.length}</div>
      {card && cardDrawn ? (
        <div className="card current-card">
          <img src={`src/Cards/assets/card_${card}.png`} alt={card} />
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
          {!cardDrawn && (
            <button className="draw-card-btn" onClick={() => drawCard()}>
              {cardDeck.length > 0 ? "Draw a card" : "Shuffle the deck"}
            </button>
          )}
        </>
      )}
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
