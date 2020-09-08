/**

Nice to have
- lorsqu'on drop dans diceKept le dé se met a la place la plus proche de la ou on drop
et non pas a la fin
- si on drag un dé depuis diceOnGoing, la zone diceKept entre en subrillance
- si on drag un dé depuis diceKept, la zone diceOnGoing entre en surbrillance
- collision entre les dé (si on drop sur un autre dé, le dé se met a la position la plus proche)

*/

import React from "react"
import { getDomNodeRectangle, rectangleInsideOf } from "src/helper/rectangle.js"
import {
  useDiceDomNode,
  useDiceDomNodeSetter,
  useGameDomNode,
  useDragDiceGestureSetter,
} from "src/game.store.js"
import { diceSize } from "src/dices/dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import { enableDragGesture } from "src/drag/drag.js"

const { useEffect, useState } = React

export const Dice = ({ dice, clickAllowed, disabled, draggable, onClickAction, specificStyle }) => {
  const onSkull = diceIsOnSkull(dice)
  const gameDomNode = useGameDomNode()
  const diceDomNode = useDiceDomNode(dice.id)
  const diceDomNodeSetter = useDiceDomNodeSetter(dice.id)

  const [dragIntent, setDragIntent] = useState(false)
  const [dragGesture, setDragGesture] = useState(null)
  const setDragDiceGesture = useDragDiceGestureSetter()

  useEffect(() => {
    if (!draggable || !diceDomNode || !gameDomNode) {
      return () => {}
    }

    let dragIntentTimeout
    const dropHandlerMap = new Map()
    const disableDragGesture = enableDragGesture(diceDomNode, {
      onGrip: () => {
        // nothing yet
      },
      onLongGrip: () => {
        setDragIntent(true)
      },
      onDrag: ({ x, y, relativeX, relativeY }) => {
        if (Math.abs(relativeX) > 5 || Math.abs(relativeY) > 5) {
          setDragIntent(true)
        }

        const diceDesiredRect = {
          left: x,
          right: x + diceSize,
          top: y,
          bottom: y + diceSize,
        }
        const gameDomNodeRect = getDomNodeRectangle(gameDomNode)
        const diceRectangle = rectangleInsideOf(diceDesiredRect, gameDomNodeRect)
        setDragGesture({ x: diceRectangle.left, y: diceRectangle.top })
        setDragDiceGesture({
          dice,
          diceRectangle,
          addDropHandler: (node, dropHandler) => {
            dropHandlerMap.set(node, dropHandler)
          },
        })
      },
      onRelease: ({ x, y }) => {
        // setTimeout is to ensure the click cannot happen just after mouseup
        dragIntentTimeout = setTimeout(() => setDragIntent(false))
        setDragGesture(null)
        setDragDiceGesture(null)

        const diceRectangle = {
          left: x,
          right: x + diceSize,
          top: y,
          bottom: y + diceSize,
        }
        dropHandlerMap.forEach((dropHandler) => dropHandler({ diceRectangle }))
      },
      onCancel: () => {
        setDragIntent(false)
        setDragGesture(null)
        setDragDiceGesture(null)
      },
    })
    return () => {
      disableDragGesture()
      clearTimeout(dragIntentTimeout)
    }
  }, [draggable, diceDomNode, gameDomNode])

  return (
    <button
      disabled={disabled}
      data-dice-id={dice.id}
      ref={diceDomNodeSetter}
      onClick={onClickAction && clickAllowed && !dragIntent ? () => onClickAction(dice) : undefined}
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        background: onSkull ? "black" : "#fcfcfc",
        color: onSkull ? "black" : "#fcfcfc",
        borderColor: onSkull ? "black" : "#b9b9b9",
        ...specificStyle,
        ...(dragGesture
          ? {
              position: "fixed",
              zIndex: 1000,
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
