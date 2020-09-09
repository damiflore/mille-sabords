import React from "react"

import { cardList } from "src/cards/cards.js"

export const PreloadImages = () => (
  <div style={{ display: "none" }}>
    <img src={`src/skull-island/witch-label.png`} />
    <img src={`src/chest/pirate-hook.png`} />
    <img src={`src/chest/pirate-hook-02.png`} />
    <img src={`src/cards/card_default.png`} />
    {cardList.map((card) => {
      return <img src={`src/cards/card_${card}.png`} alt={card} key={card} />
    })}
  </div>
)
