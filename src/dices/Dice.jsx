/**


TODO:

- seul les dés dans diceOnGoing et diceKept peuvents etre drag
- si on lache un dé sur diceOnGoing alors il se place la (si il était keep il devient unkeep)
et sa position est celle de la drag gesture
- si on lache un dé sur diceKept alors il se range dans la boite
si il était ongoing il devient keep
- si on lache un dé hors de ces zones le dé se replace ou il était

Nice to have
- lorsqu'on drop dans diceKept le dé se met a la place la plus proche de la ou on drop
et non pas a la fin
- si on drag un dé depuis diceOnGoing, la zone diceKept entre en subrillance
- si on drag un dé depuis diceKept, la zone diceOnGoing entre en surbrillance
- collision entre les dé (si on drop sur un autre dé, le dé se met a la position la plus proche)

*/

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
    let dragIntentTimeout
    const disableDragGesture = enableDragGesture(diceNode, {
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
        dragIntentTimeout = setTimeout(() => setDragIntent(false))
      },
      onCancel: () => {
        setDragIntent(false)
        setDragIntent(null)
      },
    })
    return () => {
      disableDragGesture()
      clearTimeout(dragIntentTimeout)
    }
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
