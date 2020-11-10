import React from "react"

import { Image } from "src/generic/Image.jsx"
import { cardToSmallImageUrl } from "src/cards/cards.js"

const SmallCardForward = ({ card, ...props }, ref) => {
  return (
    <div
      className="card current-card"
      ref={ref}
      style={{
        backgroundColor: card.color1,
        borderColor: card.color2,
      }}
      {...props}
    >
      <Image src={cardToSmallImageUrl(card)} alt={card.type} />
    </div>
  )
}

export const SmallCard = React.forwardRef(SmallCardForward)
