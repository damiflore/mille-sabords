/* eslint-disable import/max-dependencies */
import React from "react"

import { useSignalState } from "src/helper/signal.js"
import { useCurrentCardId, useChestSlots } from "src/main.store.js"
import { Image } from "src/generic/Image.jsx"
import { useThreeSkullsOrMoreInCursedArea } from "src/round/round.selectors.js"

import { symbolToImageUrl } from "src/symbols/symbols.js"
import { cardIdToCard, isChestCard } from "src/cards/cards.js"
import { diceToVisibleSymbol } from "src/dices/dices.js"

import { RoundScore } from "src/round/RoundScore.jsx"
import { diceSize } from "src/dices/dicePosition.js"

import cursedGridImageUrl from "src/chest/cursed-grid.png"

export const Chest = ({ chestRef, diceOverChestListener }) => {
  const chestSlots = useChestSlots()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()
  const diceOverChest = useSignalState(diceOverChestListener)
  const currentCard = cardIdToCard(useCurrentCardId())
  const protectedByChestCard = threeSkullsOrMoreInCursedArea && isChestCard(currentCard)

  /*
    to get better user experience we should instantiate 9 elements even if the dices are not kept
    these elements would be valid drop target
    so that user can choose to put the dice where he wants in the dice kept area

    beware though because we still want user to drop a dice
    anywhere in the kept area and dice will choose to drop where it intersects most

    to achieve this the most intersecting drop target should win (how to do that remains to be found)

    il faut vraiment le coder comme ça
    parce que c'est plus simple a comprendre
  */

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
        {threeSkullsOrMoreInCursedArea && !protectedByChestCard ? <CursedCover /> : null}
      </div>
      <RoundScore />
    </div>
  )
}

export const chestSlotContentToSymbol = (chestSlotContent, dices) => {
  if (chestSlotContent && chestSlotContent.type === "symbol") {
    return chestSlotContent.value
  }

  if (chestSlotContent && chestSlotContent.type === "dice") {
    const diceId = chestSlotContent.value
    const dice = dices[diceId]
    return diceToVisibleSymbol(dice)
  }

  return null
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
