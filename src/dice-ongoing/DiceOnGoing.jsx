import React from "react"

import { getDomNodePageRect } from "src/dom/dom.js"
import { rectangleCollides } from "src/helper/rectangle.js"

import {
  useDicesRolled,
  useDicesKept,
  useRolledAreaDomNodeSetter,
  useDragDiceGesture,
} from "src/game.store.js"
import { useKeepDiceAllowed } from "src/game.selectors.js"
import { useKeepDice } from "src/dices/dices.actions.js"

import { Dice } from "src/dices/Dice.jsx"
import { diceIsOnSkull } from "src/dices/dices.js"

const { useState, useEffect } = React

export const DiceOnGoing = () => {
  const dicesRolled = useDicesRolled()
  const keepDiceAllowed = useKeepDiceAllowed()
  const keepDice = useKeepDice()

  const dragDiceGesture = useDragDiceGesture()
  const dicesKept = useDicesKept()
  const [diceOnGoingDomNode, diceOnGoingDomNodeSetter] = useState(null)
  const [hoveredByKeptDice, hoveredByKeptDiceSetter] = useState(false)
  useEffect(() => {
    if (diceOnGoingDomNode) {
      const hoveredByRolledDice = hoveredByKeptDiceGetter({
        dragDiceGesture,
        dicesKept,
        diceOnGoingDomNode,
      })
      hoveredByKeptDiceSetter(hoveredByRolledDice)
    }
  }, [dragDiceGesture, dicesKept, diceOnGoingDomNode])

  return (
    <div
      className="dice-ongoing"
      ref={diceOnGoingDomNodeSetter}
      style={{
        ...(hoveredByKeptDice ? { outline: "2px dotted" } : {}),
      }}
    >
      <div className="map"></div>
      <div className="area" ref={useRolledAreaDomNodeSetter()}>
        {dicesRolled.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            clickAllowed={diceIsOnSkull(dice) ? false : keepDiceAllowed}
            onClickAction={(dice) => {
              keepDice(dice)
            }}
            draggable={true}
            specificStyle={{
              left: `${dice.x}px`,
              top: `${dice.y}px`,
              transform: `rotate(${dice.rotation}deg)`,
              position: "absolute",
            }}
          />
        ))}
      </div>
    </div>
  )
}

const hoveredByKeptDiceGetter = ({ dragDiceGesture, dicesKept, diceOnGoingDomNode }) => {
  if (!dragDiceGesture) {
    return false
  }

  const draggedDice = dragDiceGesture.dice
  const diceIsKept = dicesKept.includes(draggedDice)
  if (!diceIsKept) {
    return false
  }
  const diceOnGoingDomNodeRect = getDomNodePageRect(diceOnGoingDomNode)
  if (!rectangleCollides(dragDiceGesture.diceRect, diceOnGoingDomNodeRect)) {
    return false
  }
  return true
}
