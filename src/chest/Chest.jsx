import React from "react"

import {
  getDomNodeRectangle,
  rectangleCollidesWith,
  findClosestRectangle,
} from "src/helper/rectangle.js"

import {
  createGameAction,
  useCurrentCard,
  useChestSlots,
  useDicesRolled,
  useDragDiceGesture,
} from "src/game.store.js"
import { useUnkeepDiceAllowed, useThreeSkullsOrMoreInCursedArea } from "src/game.selectors.js"
import { useUnkeepDice, useKeepDice } from "src/dices/dices.actions.js"

import { cardColors } from "src/cards/cards.js"
import { Dice } from "src/dices/Dice.jsx"
import { RoundScore } from "src/score/RoundScore.jsx"
import { diceSize } from "src/dices/dicePosition.js"

const { useState, useEffect } = React

export const Chest = () => {
  const chestSlots = useChestSlots()

  const [chestDropAreaDomNode, chestDropAreaDomNodeSetter] = useState(null)
  const dragDiceGesture = useDragDiceGesture()
  const [diceDraggedOver, diceDraggedOverSetter] = useState(false)
  useEffect(() => {
    diceDraggedOverSetter(diceDraggedOverGetter({ dragDiceGesture, chestDropAreaDomNode }))
  }, [dragDiceGesture, chestDropAreaDomNode])

  const dicesRolled = useDicesRolled()
  const hoveredByRolledDice = diceDraggedOver && dicesRolled.includes(diceDraggedOver)
  const hoveredByKeptDice =
    diceDraggedOver &&
    Object.keys(chestSlots).some(
      (key) => chestSlots[key] && chestSlots[key].value === diceDraggedOver,
    )

  const keepDice = useKeepDice()
  const repositionDiceInChest = useRepositionDiceInChest()
  useEffect(() => {
    if (dragDiceGesture) {
      dragDiceGesture.setDropHandler(chestDropAreaDomNode, ({ diceRectangle }) => {
        if (threeSkullsOrMoreInCursedArea) return
        if (!hoveredByRolledDice && !hoveredByKeptDice) return

        const rectangleToChestSlotMap = new Map()
        const rectangleCandidates = []
        Object.keys(chestSlots).forEach((chestSlot) => {
          const chestSlotContent = chestSlots[chestSlot]
          const chestSlotIsEmpty = !chestSlotContent
          if (chestSlotIsEmpty || chestSlotContent.value === diceDraggedOver) {
            const chestSlotDomNode = chestDropAreaDomNode.querySelector(
              `[data-chest-slot="${chestSlot}"]`,
            )
            const rectangle = getDomNodeRectangle(chestSlotDomNode)
            rectangleToChestSlotMap.set(rectangle, chestSlot)
            rectangleCandidates.push(rectangle)
          }
        })
        const closestRectangle = findClosestRectangle(diceRectangle, rectangleCandidates)
        const closestChestSlot = rectangleToChestSlotMap.get(closestRectangle)
        if (hoveredByRolledDice) {
          keepDice(diceDraggedOver, closestChestSlot)
        } else {
          repositionDiceInChest(diceDraggedOver, closestChestSlot)
        }
      })
    }
  }, [dragDiceGesture, chestDropAreaDomNode])

  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()

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
        className="dice-area"
        ref={chestDropAreaDomNodeSetter}
        style={{
          ...(hoveredByRolledDice && !threeSkullsOrMoreInCursedArea
            ? { outline: "2px dotted" }
            : {}),
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
  const currentCard = useCurrentCard()
  const unkeepDiceAllowed = useUnkeepDiceAllowed()
  const unkeepDice = useUnkeepDice()

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
          backgroundColor: cardColors[currentCard].color1,
          borderColor: cardColors[currentCard].color2,
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <img
          src={`src/dices/dice_${symbol}.png`}
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
  const dice = chestSlotContent.value
  return (
    <Dice
      dice={dice}
      draggable={true}
      clickAllowed={unkeepDiceAllowed}
      onClickAction={(dice) => {
        unkeepDice(dice, dice.rolledAreaPosition)
      }}
    />
  )
}

const diceDraggedOverGetter = ({ dragDiceGesture, chestDropAreaDomNode }) => {
  if (!dragDiceGesture) {
    return null
  }
  const chestDropAreaDomNodeRectangle = getDomNodeRectangle(chestDropAreaDomNode)
  if (!rectangleCollidesWith(dragDiceGesture.diceRectangle, chestDropAreaDomNodeRectangle)) {
    return null
  }
  return dragDiceGesture.dice
}

const CursedCover = () => {
  return (
    <div className="cursed-cover">
      <img src={`src/chest/cursed-cover.png`} alt="cursed-cover" />
    </div>
  )
}

const useRepositionDiceInChest = createGameAction((state, dice, chestSlot) => {
  const { chestSlots } = state
  const previousChestSlot = dice.chestSlot
  dice.chestSlot = chestSlot
  return {
    ...state,
    chestSlots: {
      ...chestSlots,
      [previousChestSlot]: null,
      [chestSlot]: { type: "dice", value: dice },
    },
  }
})
