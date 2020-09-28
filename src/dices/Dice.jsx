/* eslint-disable no-nested-ternary */
/* eslint-disable import/max-dependencies */
/**

Nice to have
- collision entre les dé (si on drop sur un autre dé, le dé se met a la position la plus proche)

todo:

lorsqu'on drop un dé hors de dice kept il revient a sa place avec une animation et pas immédiatement
lorsqu'on drop un dé dans dice kept il se place avec animation + scale back avec animation

lorsque le dé est dropped on va le déplacer a l'endroit voulu
mais aussi démarrer une animation pour ce dé
*/

import React from "react"

import { usePrevious } from "src/hooks.js"
import { Portal } from "src/generic/Portal.jsx"
import { rectangleToRectangleInsideDomNode, printPointInDocument } from "src/dom/dom.position.js"
import { stringifyTransformations } from "src/helper/render.js"
import { useDiceDomNode, useDiceDomNodeSetter, useMainDomNode } from "src/dom/dom.main.js"
import { diceSize } from "src/dices/dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import { enableDragGesture } from "src/drag/drag.js"

const { useEffect, useState } = React

export const Dice = ({
  dice,
  diceAnimation,
  anmationDebug = false,
  container,
  x,
  y,
  rotation,
  draggable,
  onDiceAnimationEnd,
  onDiceClick,
  onDiceDrag,
  onDiceDrop,
  onDiceDragEnd,
  disapear,
  appear,
}) => {
  // si y'a une animation alors reste dans ton conteneur
  // le temps qu'elle se finisse
  const containerPrevious = usePrevious(container)
  const portalContainer = diceAnimation ? containerPrevious : container

  // state from other contexts
  const mainDomNode = useMainDomNode()
  const diceDomNode = useDiceDomNode(dice.id)
  const diceDomNodeSetter = useDiceDomNodeSetter(dice.id)

  // local states
  const [diceGripped, diceGrippedSetter] = useState(false)
  const [dragGesture, setDragGesture] = useState(null)

  const onSkull = diceIsOnSkull(dice)
  const diceX =
    diceAnimation && diceAnimation.from ? diceAnimation.from.x : dragGesture ? dragGesture.x : x
  const diceY =
    diceAnimation && diceAnimation.from ? diceAnimation.from.y : dragGesture ? dragGesture.y : y

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
        const diceRectangle = rectangleToRectangleInsideDomNode(diceDesiredRect, mainDomNode)
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

  useEffect(() => {
    if (!diceAnimation || !diceDomNode) return () => {}

    const from = diceAnimation.from
    const to = diceAnimation.to
    if (anmationDebug) {
      printPointInDocument(from)
      printPointInDocument(to)
    }
    const transform = `translate(${Math.floor(to.x - from.x)}px, ${Math.floor(to.y - from.y)}px)`
    const animation = diceDomNode.parentNode.animate(
      [
        {
          transform,
        },
      ],
      {
        duration: 500,
        fill: "forwards",
        easing: "cubic-bezier(0, 0.55, 0.45, 1)",
      },
    )
    animation.onfinish = () => {
      onDiceAnimationEnd(dice)
    }
    return () => {
      animation.cancel()
    }
  }, [diceDomNode, diceAnimation])

  return (
    <Portal parent={portalContainer}>
      <svg
        data-dice-id={dice.id}
        className="dice"
        onClick={
          draggable
            ? undefined
            : (clickEvent) => {
                onDiceClick(dice, clickEvent)
              }
        }
        style={{
          width: diceSize,
          height: diceSize,
          left: `${diceX}px`,
          top: `${diceY}px`,
          ...(dragGesture || diceAnimation
            ? {
                position: "fixed",
                zIndex: 1000,
              }
            : {}),
        }}
      >
        <g
          ref={diceDomNodeSetter}
          className={disapear ? "dice-cursed-disapear" : appear ? "dice-cursed-appear" : ""}
          style={{
            transform: stringifyTransformations({
              rotate: rotation ? rotation : 0,
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
    </Portal>
  )
}
