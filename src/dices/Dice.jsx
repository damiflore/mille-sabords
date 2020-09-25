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
import { stringifyClassNames, stringifyTransformations } from "src/helper/render.js"
import { useDiceDomNode, useDiceDomNodeSetter, useMainDomNode } from "src/dom/dom.main.js"
import { diceSize } from "src/dices/dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import { enableDragGesture } from "src/drag/drag.js"
import { useDiceCursedIds, useDiceRolledIds, useChestSlots } from "src/main.store.js"
import { useDiceKeptIds } from "src/round/round.selectors.js"

const { useEffect, useState } = React

export const Dice = ({
  dice,
  diceAnimation,
  anmationDebug = false,
  onDiceAnimationEnd,
  chestRef,
  rolledAreaRef,
  offscreenRef,
  cursedAreaRef,
  onDiceClick,
  onDiceDrag,
  onDiceDrop,
  onDiceDragEnd,
}) => {
  const chestSlots = useChestSlots()
  const diceKeptIds = useDiceKeptIds()
  const diceRolledIds = useDiceRolledIds()
  const diceCursedIds = useDiceCursedIds()

  // si y'a une animation alors reste dans ton conteneur
  // le temps qu'elle se finisse

  const { container, rotation, x, y, draggable } = diceLocationToInfo(dice, {
    // chest
    diceKeptIds,
    chestSlots,
    chestRef,
    // rolled
    diceRolledIds,
    rolledAreaRef,
    // cursed
    diceCursedIds,
    cursedAreaRef,
    // offscreen
    offscreenRef,
  })
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
        className={stringifyClassNames([
          "dice",
          ...(becomesCursed ? ["dice-cursed-disapear"] : []),
          ...(becomesUncursed ? ["dice-cursed-appear"] : []),
        ])}
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

const diceLocationToInfo = (
  dice,
  {
    // chest
    diceKeptIds,
    chestSlots,
    chestRef,
    // rolled
    diceRolledIds,
    rolledAreaRef,
    // cursed
    diceCursedIds,
    cursedAreaRef,
    // offscreen
    offscreenRef,
  },
) => {
  if (diceKeptIds.includes(dice.id)) {
    if (!chestRef.current) return {}

    const diceChestSlot = Object.keys(chestSlots).find(
      (chestSlot) =>
        chestSlots[chestSlot] &&
        chestSlots[chestSlot].type === "dice" &&
        chestSlots[chestSlot].value === dice.id,
    )
    return {
      container: chestRef.current.querySelector(`[data-chest-slot="${diceChestSlot}"]`),
      rotation: 0,
      x: 0,
      y: 0,
      draggable: true,
    }
  }

  if (diceRolledIds.includes(dice.id)) {
    return {
      container: rolledAreaRef.current,
      rotation: dice.rotation,
      x: dice.rolledAreaPosition.x,
      y: dice.rolledAreaPosition.y,
      draggable: true,
    }
  }

  if (diceCursedIds.includes(dice.id)) {
    return {
      // TODO: create some slot in the skull
      // bottle so that dice can be placed properly
      // otherwse we must keep a dice
      // cursedAreaPosition
      container: cursedAreaRef.current,
      rotation: 0,
      x: 0,
      y: 0,
      draggable: false,
    }
  }

  return {
    container: offscreenRef.current,
    rotation: 0,
    x: 0,
    y: 0,
    draggable: false,
  }
}
