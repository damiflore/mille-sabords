import React from "react"

import { getDomNodePageRect } from "src/dom/dom.js"
import { rectangleCollides } from "src/helper/rectangle.js"

import {
  useDicesRolled,
  useDicesKept,
  useRolledAreaDomNode,
  useRolledAreaDomNodeSetter,
  useDragDiceGesture,
  createGameAction,
} from "src/game.store.js"
import { useKeepDiceAllowed } from "src/game.selectors.js"
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

  const dicesKept = useDicesKept()
  const hoveredByKeptDice = diceDraggedOver && dicesKept.includes(diceDraggedOver)
  const hoveredByRolledDice = diceDraggedOver && dicesRolled.includes(diceDraggedOver)

  const unkeepDice = useUnkeepDice()
  const movedRolledDice = useMoveRolledDice()
  useEffect(() => {
    if (dragDiceGesture) {
      dragDiceGesture.addDropHandler(rolledAreaDomNode, ({ x, y }) => {
        if (hoveredByKeptDice) {
          unkeepDice(diceDraggedOver)
          const rolledAreaDomNodeReactangle = getDomNodePageRect(rolledAreaDomNode)
          movedRolledDice(diceDraggedOver, {
            x: x - rolledAreaDomNodeReactangle.left,
            y: y - rolledAreaDomNodeReactangle.top,
          })
        } else if (hoveredByRolledDice) {
          const rolledAreaDomNodeReactangle = getDomNodePageRect(rolledAreaDomNode)

          movedRolledDice(diceDraggedOver, {
            x: x - rolledAreaDomNodeReactangle.left,
            y: y - rolledAreaDomNodeReactangle.top,
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

const diceDraggedOverGetter = ({ dragDiceGesture, rolledAreaDomNode }) => {
  if (!dragDiceGesture) {
    return null
  }
  const rolledAreaDomNodeRectangle = getDomNodePageRect(rolledAreaDomNode)
  if (!rectangleCollides(dragDiceGesture.diceRect, rolledAreaDomNodeRectangle)) {
    return null
  }
  return dragDiceGesture.dice
}

const useMoveRolledDice = createGameAction((state, dice, position) => {
  const { dicesRolled } = state
  dice.rotation = 0
  dice.x = position.x
  dice.y = position.y
  return {
    ...state,
    dicesRolled: [...dicesRolled],
  }
})
