import React from "react"

import { Image } from "/src/app/generic/Image.jsx"
import { cardToSmallImageUrl } from "/src/app/cards/cards.js"

const SmallCardForward = ({ card, ...props }, ref) => {
  return (
    <div
      className="card current-card"
      ref={ref}
      width="55"
      height="55"
      style={{
        backgroundColor: card.color1,
        borderColor: card.color2,
      }}
      {...props}
    >
      <Image
        src={cardToSmallImageUrl(card)}
        alt={card.type}
        width="55"
        height="55"
      />
    </div>
  )
}

export const SmallCard = React.forwardRef(SmallCardForward)
