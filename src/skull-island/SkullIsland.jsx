import React from "react"

import { Image } from "src/generic/Image.jsx"
import { useCurrentCardId, useCurrentCardActivated } from "src/main.store.js"
import { cardIdToCard, isOneSkullCard, isTwoSkullsCard, isWitchCard } from "src/cards/cards.js"
import { diceSize } from "src/dices/dicePosition.js"
import { symbolSkullUrl } from "src/symbols/symbols.js"

const wichLabelImageUrl = new URL("/src/skull-island/witch-label.png", import.meta.url)

export const SkullIsland = ({ cursedAreaRef }) => {
  const currentCard = cardIdToCard(useCurrentCardId())

  return (
    <div className="skull-island">
      {isWitchCard(currentCard) ? <UncurseDiceLabel /> : null}
      <div className="bottle">
        <div className="area" ref={cursedAreaRef}>
          {isOneSkullCard(currentCard) ? <ExtraSkull card={currentCard} /> : null}
          {isTwoSkullsCard(currentCard) ? (
            <>
              <ExtraSkull card={currentCard} />
              <ExtraSkull card={currentCard} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const ExtraSkull = ({ card }) => {
  return (
    <button
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        color: "#eaeaea",
        margin: "1px 5px",
        backgroundColor: card.color1,
        borderColor: card.color2,
        borderWidth: "2px",
      }}
    >
      <Image
        src={symbolSkullUrl}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  )
}

const UncurseDiceLabel = () => {
  const currentCardActivated = useCurrentCardActivated()

  if (!currentCardActivated) {
    return <Image style={{ display: "none" }} src={wichLabelImageUrl} />
  }

  return (
    <div className="witch-label">
      <Image src={wichLabelImageUrl} />
      <svg x="0px" y="0px" width="156.083px" height="208.667px" viewBox="0 0 156.083 208.667">
        <path
          id="path_01"
          fill="none"
          stroke="#E4AD30"
          d="M8.406,107.82
	c2.541,2.178,2.375,2.875,14.25,3.5c14.782,0.778,19.26-11.965,19.26-11.965S47.918,88,40.251,72.917s-18.916,4.583-9.083,8.167
	s27.759-1.338,35.142-12.417C74.75,56,77.583,45.333,79.25,37S78.477,15.833,66.31,3.833"
        />
        <path
          id="path_02"
          fill="none"
          stroke="#E4AD30"
          d="M44.031,110.094
	c0,0,1,1.313-4.438,3.344s-14.244,7.281-32.125-2"
        />
        <path
          id="path_03"
          fill="none"
          stroke="#E4AD30"
          d="M42.125,103.688
	c0,0,1.313,6.594-9.313,8.625S10.281,108.719,9.406,101"
        />
        <path
          id="path_04"
          fill="none"
          stroke="#E4AD30"
          d="M33.114,112.253c0,0,39.886-19.253,43.011,24.747
	c0.372,0.447-0.959,1.208-2.542,1.625"
        />
      </svg>
    </div>
  )
}
