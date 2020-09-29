import React from "react"

import { useSignalListener } from "src/hooks.js"
import { useCurrentCardId, useChestSlots } from "src/main.store.js"
import { useThreeSkullsOrMoreInCursedArea } from "src/round/round.selectors.js"

import { cardIdToCard } from "src/cards/cards.js"
import { RoundScore } from "src/score/RoundScore.jsx"
import { diceSize } from "src/dices/dicePosition.js"

export const Chest = ({ chestRef, diceOverChestSignal }) => {
  const chestSlots = useChestSlots()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()
  const diceOverChest = useSignalListener(diceOverChestSignal)

  return (
    <div className="chest">
      <div
        className="dice-area"
        ref={chestRef}
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
        {threeSkullsOrMoreInCursedArea ? <CursedCover /> : null}
      </div>
      <RoundScore />
    </div>
  )
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
          color: "#fcfcfc",
          margin: "5px",
          backgroundColor: currentCard.color1,
          borderColor: currentCard.color2,
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <img
          src={`/src/dices/dice_${symbol}.png`}
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
      <img draggable="false" src={`/src/chest/cursed-grid.png`} alt="cursed-cover" />
    </div>
  )
}
