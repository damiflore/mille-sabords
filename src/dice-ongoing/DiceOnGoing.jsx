import React from "react"

import {
  rectangleCollidesWithRectangle,
  rectangleRelativeTo,
  rectangleInsideOf,
  getDomNodeRectangle,
} from "src/helper/rectangle.js"

import { useDicesRolled, useChestSlots, createAction } from "src/main.store.js"
import { useDragDiceGesture } from "src/drag/drag.main.js"
import { useRolledAreaDomNode, useRolledAreaDomNodeSetter } from "src/dom/dom.main.js"
import { useKeepDiceAllowed } from "src/game/game.selectors.js"
import { useKeepDice, useUnkeepDice } from "src/dices/dices.actions.js"

import { Dice } from "src/dices/Dice.jsx"
import { diceIsOnSkull } from "src/dices/dices.js"

const { useState, useEffect } = React

export const DiceOnGoing = () => {
  const dicesRolled = useDicesRolled()
  const keepDiceAllowed = useKeepDiceAllowed()
  const keepDice = useKeepDice()
  const rolledAreaDomNode = useRolledAreaDomNode()

  const dragDiceGesture = useDragDiceGesture()
  const [diceDraggedOver, diceDraggedOverSetter] = useState(false)
  useEffect(() => {
    diceDraggedOverSetter(diceDraggedOverGetter({ dragDiceGesture, rolledAreaDomNode }))
  }, [dragDiceGesture, rolledAreaDomNode])

  const chestSlots = useChestSlots()
  const hoveredByKeptDice =
    diceDraggedOver &&
    Object.keys(chestSlots).some(
      (key) => chestSlots[key] && chestSlots[key].value === diceDraggedOver,
    )
  const hoveredByRolledDice = diceDraggedOver && dicesRolled.includes(diceDraggedOver)

  const unkeepDice = useUnkeepDice()
  const repositionDiceInRolledArea = useRepositionDiceInRolledArea()
  useEffect(() => {
    if (dragDiceGesture) {
      dragDiceGesture.setDropHandler(rolledAreaDomNode, ({ diceRectangle }) => {
        if (!hoveredByKeptDice && !hoveredByRolledDice) return

        const rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode)
        const diceRectangleRelative = rectangleRelativeTo(
          rectangleInsideOf(diceRectangle, rolledAreaDomNodeRectangle),
          rolledAreaDomNodeRectangle,
        )

        if (hoveredByKeptDice) {
          unkeepDice(diceDraggedOver, {
            x: diceRectangleRelative.left,
            y: diceRectangleRelative.top,
          })
        } else {
          repositionDiceInRolledArea(diceDraggedOver, {
            x: diceRectangleRelative.left,
            y: diceRectangleRelative.top,
          })
        }
      })
    }
  }, [dragDiceGesture, rolledAreaDomNode])

  return (
    <div className="dice-ongoing">
      <div className="map"></div>
      <div
        className="area"
        ref={useRolledAreaDomNodeSetter()}
        style={{
          ...(hoveredByKeptDice ? { outline: "2px dotted" } : {}),
        }}
      >
        {dicesRolled.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            clickAllowed={diceIsOnSkull(dice) ? false : keepDiceAllowed}
            onClickAction={(dice) => {
              const freeSlot = Object.keys(chestSlots).find((key) => !chestSlots[key])
              keepDice(dice, freeSlot)
            }}
            draggable={true}
            diceOnGoing={true}
            specificStyle={{
              left: `${dice.rolledAreaPosition.x}px`,
              top: `${dice.rolledAreaPosition.y}px`,
              transform: `rotate(${dice.rotation}deg)`,
              position: "absolute",
            }}
          />
        ))}
      </div>
    </div>
  )
}

const diceDraggedOverGetter = ({ dragDiceGesture, rolledAreaDomNode }) => {
  if (!dragDiceGesture) {
    return null
  }
  const rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode)
  if (!rectangleCollidesWithRectangle(dragDiceGesture.diceRectangle, rolledAreaDomNodeRectangle)) {
    return null
  }
  return dragDiceGesture.dice
}

const useRepositionDiceInRolledArea = createAction((state, dice, position) => {
  const { dicesRolled } = state
  dice.rotation = 0
  dice.rolledAreaPosition = position
  return {
    ...state,
    dicesRolled: [...dicesRolled],
  }
})
