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

  const [dragIntent, setDragIntent] = useState(false)
  const [moveGesture, setMoveGesture] = useState(null)

  useEffect(() => {
    if (!diceNode) return () => {}
    return enableDragGesture(diceNode, {
      onGrip: () => {
        // nothing yet
      },
      onLongGrip: () => {
        setDragIntent(true)
      },
      onMove: ({ x, y, relativeX, relativeY }) => {
        if (Math.abs(relativeX) > 5 || Math.abs(relativeY) > 5) {
          setDragIntent(true)
        }
        setMoveGesture({ x, y })
      },
      onRelease: () => {
        setTimeout(() => setDragIntent(false))
      },
      onCancel: () => {
        setDragIntent(false)
        setDragIntent(null)
      },
    })
  }, [diceNode])

  return (
    <button
      disabled={disabled}
      data-dice-id={dice.id}
      ref={diceNodeSetter}
      onClick={onClickAction && clickAllowed && !dragIntent ? () => onClickAction(dice) : undefined}
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        background: onSkull ? "black" : "#fcfcfc",
        color: onSkull ? "black" : "#fcfcfc",
        borderColor: onSkull ? "black" : "#b9b9b9",
        ...specificStyle,
        ...(moveGesture
          ? {
              position: "fixed",
              zIndex: 1000,
              transform: "none",
              left: moveGesture.x,
              top: moveGesture.y,
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
