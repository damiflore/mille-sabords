import React from "react"
import { useDiceNode, useDiceNodeSetter } from "src/game.store.js"
import { diceSize } from "src/dices/dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import { enableDragGesture } from "src/drag/drag.js"

const { useEffect, useState } = React

export const Dice = ({ dice, clickAllowed, disabled, onClickAction, specificStyle }) => {
  const onSkull = diceIsOnSkull(dice)
  const diceNode = useDiceNode(dice.id)
  const diceNodeSetter = useDiceNodeSetter(dice.id)

  const [dragGesture, setDragGesture] = useState(null)

  useEffect(() => {
    if (!diceNode) return () => {}
    return enableDragGesture(diceNode, (gesture) => {
      setDragGesture(gesture)
    })
  }, [diceNode])

  return (
    <button
      disabled={disabled}
      data-dice-id={dice.id}
      ref={diceNodeSetter}
      onClick={clickAllowed ? () => onClickAction(dice) : undefined}
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        background: onSkull ? "black" : "#fcfcfc",
        color: onSkull ? "black" : "#fcfcfc",
        borderColor: onSkull ? "black" : "#b9b9b9",
        ...specificStyle,
        zIndex: 1000,
        ...(dragGesture
          ? {
              position: "fixed",
              transform: "none",

              left: dragGesture.x,
              top: dragGesture.y,
            }
          : {}),
      }}
    >
      <img
        src={`src/dices/dice_${diceToVisibleSymbol(dice)}.png`}
        draggable="false"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  )
}
