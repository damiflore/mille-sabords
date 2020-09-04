import React from "react"
import { useDiceNode, useDiceNodeSetter } from "src/game.store.js"
import { diceSize } from "./dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import { enableDragAndDropGesture } from "src/drag-drop/drag-drop.js"

const { useEffect, useState } = React

export const Dice = ({ dice, clickAllowed, disabled, onClickAction, specificStyle }) => {
  const onSkull = diceIsOnSkull(dice)
  const diceNode = useDiceNode(dice.id)
  const diceNodeSetter = useDiceNodeSetter(dice.id)

  const [dragAndDropGesture, setDragAndDropGesture] = useState(null)

  useEffect(() => {
    if (!diceNode) return () => {}
    return enableDragAndDropGesture(diceNode, (gesture) => {
      setDragAndDropGesture(gesture)
    })
  }, [diceNode])

  // the issue right now is that the element is not in a fixed position in the page meaning
  // the position would not work

  return (
    <button
      disabled={disabled}
      data-dice-id={dice.id}
      ref={diceNodeSetter}
      onClick={
        clickAllowed
          ? () => {
              // il faut quelque chose de plus comme notion
              // sinon peut plus cliquer sur le dé puisque mousedown === grip gesture
              // if (!dragAndDropGesture) {
              onClickAction(dice)
              // }
            }
          : undefined
      }
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        background: onSkull ? "black" : "#fcfcfc",
        color: onSkull ? "black" : "#fcfcfc",
        borderColor: onSkull ? "black" : "#b9b9b9",
        ...specificStyle,
        zIndex: 1000,
        ...(dragAndDropGesture
          ? {
              position: "fixed",
              transform: "none",

              left: dragAndDropGesture.x,
              top: dragAndDropGesture.y,
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
