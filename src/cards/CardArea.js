import React from "react"
import { useCardDeck } from "src/game.store.js"

export const CardArea = () => {
  const cardDeck = useCardDeck()

  return (
    <div className="card-area">
      <div className="remaining-cards-number">{cardDeck.length}</div>
      {/* <CurrentCard /> */}
      <div
        className="card default-card"
        style={{ backgroundImage: "url('src/cards/card_default.png')" }}
      >
        {/* <DeckButton /> */}
      </div>
    </div>
  )
}
