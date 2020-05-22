import React from "react"
import { useGameState } from "src/MilleSabordGame.js"

export const CardArea = () => {
  const { cardDeck } = useGameState()

  return (
    <div className="card-area">
      <div className="remaining-cards-number">{cardDeck.length}</div>
      {/* <CurrentCard /> */}
      <div
        className="card default-card"
        style={{ backgroundImage: "url('src/Cards/assets/card_default.png')" }}
      >
        {/* <DeckButton /> */}
      </div>
    </div>
  )
}
