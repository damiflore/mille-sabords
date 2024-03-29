import React from "react"

import { useSignalState } from "/app/helper/signal.js"
import { useCurrentCardId, useChestSlots } from "/app/main.store.js"
import { Image } from "/app/generic/Image.jsx"
import { useThreeSkullsOrMoreInCursedArea } from "/app/round/round.selectors.js"

import { symbolToImageUrl } from "/app/symbols/symbols.js"
import { cardIdToCard, isChestCard } from "/app/cards/cards.js"
import { RoundScore } from "/app/round/RoundScore.jsx"
import { diceSize } from "/app/dices/dicePosition.js"

const cursedGridImageUrl = new URL("./cursed-grid.png", import.meta.url)

export const Chest = ({ chestRef, diceOverChestListener }) => {
  const chestSlots = useChestSlots()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()
  const diceOverChest = useSignalState(diceOverChestListener)
  const currentCard = cardIdToCard(useCurrentCardId())
  const protectedByChestCard =
    threeSkullsOrMoreInCursedArea && isChestCard(currentCard)

  return (
    <div className="chest">
      <div
        ref={chestRef}
        className={`dice-area ${isChestCard(currentCard) ? "glow" : ""}`}
        style={{
          ...(diceOverChest ? { outline: "2px dotted" } : {}),
        }}
      >
        <div className="box">
          {Object.keys(chestSlots).map((chestSlot) => (
            <div className="slot" key={chestSlot} data-chest-slot={chestSlot}>
              <ChestSlot chestSlotContent={chestSlots[chestSlot]} />
            </div>
          ))}
        </div>
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
        {threeSkullsOrMoreInCursedArea && !protectedByChestCard ? (
          <CursedCover />
        ) : null}
      </div>
      <RoundScore />
    </div>
  )
}

export const compareChestSlotContent = (
  chestSlotContentLeft,
  chestSlotContentRight,
) => {
  const leftHasContent = Boolean(chestSlotContentLeft)
  const rightHasContent = Boolean(chestSlotContentRight)
  if (!leftHasContent && !rightHasContent) {
    return true
  }
  if (leftHasContent !== rightHasContent) {
    return false
  }

  const leftType = chestSlotContentLeft.type
  const rightType = chestSlotContentRight.type
  if (leftType !== rightType) {
    return false
  }

  return chestSlotContentLeft.value === chestSlotContentRight.value
}

const ChestSlot = ({ chestSlotContent }) => {
  const currentCard = cardIdToCard(useCurrentCardId())

  if (!chestSlotContent) {
    return null
  }

  if (chestSlotContent.type === "symbol") {
    const symbol = chestSlotContent.value
    return (
      <button
        className="dice"
        style={{
          width: diceSize,
          height: diceSize,
          color: "#eaeaea",
          margin: "5px",
          backgroundColor: currentCard.color1,
          borderColor: currentCard.color2,
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <Image
          src={symbolToImageUrl(symbol)}
          draggable="false"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </button>
    )
  }

  // it's a dice
  return null
}

const CursedCover = () => {
  return (
    <div className="cursed-cover">
      <Image draggable="false" src={cursedGridImageUrl} alt="cursed-cover" />
    </div>
  )
}
