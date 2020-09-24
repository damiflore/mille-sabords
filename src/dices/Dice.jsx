/**

Nice to have
- collision entre les dé (si on drop sur un autre dé, le dé se met a la position la plus proche)

todo:

lorsqu'on drop un dé hors de dice kept il revient a sa place avec une animation et pas immédiatement
lorsqu'on drop un dé dans dice kept il se place avec animation + scale back avec animation

*/

import React from "react"
import { getDomNodeRectangle, rectangleInsideOf } from "src/helper/rectangle.js"
import { stringifyClassNames, stringifyTransformations } from "src/helper/render.js"
import { useDiceDomNode, useDiceDomNodeSetter, useMainDomNode } from "src/dom/dom.main.js"
import { diceSize } from "src/dices/dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import { enableDragGesture } from "src/drag/drag.js"

const { useEffect, useState } = React

export const Dice = ({
  // todo: draggable n'est pas toujours true
  // il faut changer ça
  draggable = true,
  dice,
  onDiceClick,
  onDiceDrag,
  onDiceDrop,
  onDiceDragEnd,
}) => {
  // state from other contexts
  const mainDomNode = useMainDomNode()
  const diceDomNode = useDiceDomNode(dice.id)
  const diceDomNodeSetter = useDiceDomNodeSetter(dice.id)

  // local states
  const [diceGripped, diceGrippedSetter] = useState(false)
  const [dragGesture, setDragGesture] = useState(null)

  const onSkull = diceIsOnSkull(dice)
  const diceRotation = dice.rotation
  const diceX = dragGesture ? dragGesture.x : dice.x
  const diceY = dragGesture ? dragGesture.y : dice.y
  const becomesCursed = false
  const becomesUncursed = false

  useEffect(() => {
    if (!draggable || !diceDomNode || !mainDomNode) {
      return () => {}
    }

    const disableDragGesture = enableDragGesture(diceDomNode, {
      onGrip: () => {
        diceGrippedSetter(true)
      },
      onClick: (clickEvent) => {
        onDiceClick(dice, clickEvent)
      },
      onDrag: ({ x, y }) => {
        const diceDesiredRect = {
          left: x,
          right: x + diceSize,
          top: y,
          bottom: y + diceSize,
        }
        const mainDomNodeRect = getDomNodeRectangle(mainDomNode)
        const diceRectangle = rectangleInsideOf(diceDesiredRect, mainDomNodeRect)
        setDragGesture({ x: diceRectangle.left, y: diceRectangle.top })
        onDiceDrag(dice, { diceRectangle })
      },
      onRelease: ({ x, y }) => {
        diceGrippedSetter(false)
        setDragGesture(null)

        const diceRectangle = {
          left: x,
          right: x + diceSize,
          top: y,
          bottom: y + diceSize,
        }
        onDiceDrop(dice, {
          diceRectangle,
        })
        onDiceDragEnd(dice)
      },
      onCancel: () => {
        diceGrippedSetter(false)
        setDragGesture(null)
        onDiceDragEnd(dice)
      },
    })
    return () => {
      disableDragGesture()
    }
  }, [draggable, diceDomNode, mainDomNode])

  return (
    <svg
      data-dice-id={dice.id}
      className={stringifyClassNames([
        "dice",
        ...(becomesCursed ? ["dice-cursed-disapear"] : []),
        ...(becomesUncursed ? ["dice-cursed-appear"] : []),
      ])}
      onClick={draggable ? undefined : (clickEvent) => onDiceClick(dice, clickEvent)}
      style={{
        width: diceSize,
        height: diceSize,
        left: `${diceX}px`,
        top: `${diceY}px`,
      }}
    >
      <g
        ref={diceDomNodeSetter}
        style={{
          transform: stringifyTransformations({
            rotate: diceRotation ? diceRotation : 0,
            scale: diceGripped ? "1.2" : "1",
          }),
          transitionProperty: "transform",
          transitionDuration: "500ms",
          // https://easings.net/#easeOutCirc
          transitionTimingFunction: "cubic-bezier(0, 0.55, 0.45, 1)",
          transformOrigin: "center center",
        }}
      >
        <rect
          className="dice-background"
          width="100%"
          height="100%"
          rx="5"
          ry="5"
          fill={onSkull ? "black" : "#fcfcfc"}
          stroke={onSkull ? "black" : "#b9b9b9"}
          strokeWidth="1"
        ></rect>
        <image
          xlinkHref={`/src/dices/dice_${diceToVisibleSymbol(dice)}.png`}
          draggable="false"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </g>
    </svg>
  )
}
