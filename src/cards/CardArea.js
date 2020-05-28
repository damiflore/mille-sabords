import React from "react"
import { useGameState } from "src/game.context.js"

export const CardArea = () => {
  const { cardDeck } = useGameState()

  return (
    <div className="card-area">
      <div className="remaining-cards-number">{cardDeck.length}</div>
      {/* <CurrentCard /> */}
      <div
        className="card default-card"
        style={{ backgroundImage: "url('src/cards/assets/card_default.png')" }}
      >
        {/* <DeckButton /> */}
      </div>
    </div>
  )
}
