/* eslint-disable import/max-dependencies */
/* eslint-disable no-nested-ternary */
import React from "react"
import { DEV } from "#env"

import { usePrevious } from "root/src/app/hooks.js"
import { Portal } from "root/src/app/generic/Portal.jsx"
import {
  rectangleToRectangleInsideDomNode,
  printPointInDocument,
} from "root/src/app/dom/dom.position.js"
import { stringifyTransformations } from "root/src/app/helper/render.js"
import {
  useDiceDomNode,
  useDiceDomNodeSetter,
  useMainDomNode,
} from "root/src/app/dom/dom.main.jsx"
import { diceSize } from "root/src/app/dices/dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "root/src/app/dices/dices.js"
import { enableDragGesture } from "root/src/app/drag/drag.js"
import { symbolToImageUrl } from "root/src/app/symbols/symbols.js"
import { useDiceKeptIds } from "root/src/app/round/round.selectors.js"

const { useEffect, useState } = React

export const Dice = ({
  dice,
  diceAnimation,
  anmationDebug = false,
  parentNode,
  zIndex,
  x,
  y,
  rotation,
  draggable,
  onDiceClick,
  onDiceDrag,
  onDiceDrop,
  onDiceDragEnd,
  disapear,
  appear,
  traceUpdate = false,
}) => {
  if (DEV && traceUpdate) {
    useTraceUpdate(
      {
        dice,
        diceAnimation,
        anmationDebug,
        parentNode,
        zIndex,
        x,
        y,
        rotation,
        draggable,
        onDiceClick,
        onDiceDrag,
        onDiceDrop,
        onDiceDragEnd,
        disapear,
        appear,
      },
      (propsUpdated) => {
        console.log(`dice ${dice.id} re-render because:`, propsUpdated)
      },
    )
  }

  // state from contexts
  const mainDomNode = useMainDomNode()
  const diceDomNode = useDiceDomNode(dice.id)
  const diceDomNodeSetter = useDiceDomNodeSetter(dice.id)
  const diceKeptIds = useDiceKeptIds()
  const isDiceKept = diceKeptIds.includes(dice.id)

  // local states
  const [diceGripped, diceGrippedSetter] = useState(false)
  const [dragGesture, setDragGesture] = useState(null)

  // si y'a une animation alors reste dans ton conteneur
  // le temps qu'elle se finisse
  const parentNodePrevious = usePrevious(parentNode)
  const portalParentNode = diceAnimation ? parentNodePrevious : parentNode

  useEffect(() => {
    if (!draggable || !diceDomNode || !mainDomNode) {
      return () => {}
    }

    let bigMoveOccured = false
    const disableDragGesture = enableDragGesture(diceDomNode, {
      onGrip: () => {
        diceGrippedSetter(true)
      },
      onClick: (clickEvent) => {
        onDiceClick(dice, clickEvent)
      },
      onDrag: ({ x, y, relativeX, relativeY, setDropEffect }) => {
        const diceDesiredRect = {
          left: x,
          right: x + diceSize,
          top: y,
          bottom: y + diceSize,
        }
        const diceRectangle = rectangleToRectangleInsideDomNode(
          diceDesiredRect,
          mainDomNode,
        )
        setDragGesture({ x: diceRectangle.left, y: diceRectangle.top })
        bigMoveOccured =
          bigMoveOccured || Math.abs(relativeX) > 10 || Math.abs(relativeY) > 10
        if (bigMoveOccured) {
          onDiceDrag(dice, {
            relativeX,
            relativeY,
            setDropEffect,
            diceRectangle,
          })
        }
      },
      onRelease: ({ dropEffect, x, y }) => {
        if (dropEffect !== "none") {
          const diceRectangle = {
            left: x,
            right: x + diceSize,
            top: y,
            bottom: y + diceSize,
          }
          onDiceDrop(dice, {
            diceRectangle,
          })
        }
        diceGrippedSetter(false)
        setDragGesture(null)
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
  }, [
    draggable,
    diceDomNode,
    mainDomNode,
    onDiceClick,
    onDiceDrag,
    onDiceDrop,
    onDiceDragEnd,
  ])

  useEffect(() => {
    if (!diceAnimation || !diceDomNode) return () => {}
    const { from, to, onfinish } = diceAnimation

    if (anmationDebug) {
      printPointInDocument(from)
      printPointInDocument(to)
    }
    const transform = `translate(${Math.floor(to.x - from.x)}px, ${Math.floor(
      to.y - from.y,
    )}px)`
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
    animation.onfinish = onfinish
    return () => {
      animation.cancel()
    }
  }, [diceDomNode, diceAnimation])

  const onSkull = diceIsOnSkull(dice)
  const diceX =
    diceAnimation && diceAnimation.from
      ? diceAnimation.from.x
      : dragGesture
      ? dragGesture.x
      : x

  const diceY =
    diceAnimation && diceAnimation.from
      ? diceAnimation.from.y
      : dragGesture
      ? dragGesture.y
      : y

  const diceZIndex = dragGesture || diceAnimation ? 1000 : zIndex

  // if (dice.id === 4 && !dragGesture) {
  //   console.log({
  //     diceX,
  //     diceY,
  //     diceAnimation: Boolean(diceAnimation),
  //     dragGesture: Boolean(dragGesture),
  //   })
  // }

  return (
    <Portal parent={portalParentNode}>
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
          zIndex: diceZIndex,
          cursor: draggable ? (diceGripped ? "grabbing" : "grab") : undefined,
          position: dragGesture || diceAnimation ? "fixed" : undefined,
        }}
      >
        <g
          ref={diceDomNodeSetter}
          className={
            disapear
              ? "dice-cursed-disapear"
              : appear
              ? "dice-cursed-appear"
              : ""
          }
          style={{
            transform: stringifyTransformations({
              rotate: rotation ? rotation : 0,
              scale: diceGripped ? "1.1" : "1",
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
            fill={computeDiceColors(onSkull, isDiceKept).fill}
            stroke={computeDiceColors(onSkull, isDiceKept).stroke}
            strokeWidth="1"
          ></rect>
          <image
            href={symbolToImageUrl(diceToVisibleSymbol(dice))}
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

const useTraceUpdate = (
  props,
  onUpdate = (changedProps) => {
    console.log("Changed props:", changedProps)
  },
) => {
  const prev = React.useRef(props)
  React.useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v]
      }
      return ps
    }, {})
    if (Object.keys(changedProps).length > 0) {
      onUpdate(changedProps)
    }
    prev.current = props
  })
}

const computeDiceColors = (onSkull, isDiceKept) => {
  if (onSkull) {
    return { fill: "black", stroke: "black" }
  } else if (isDiceKept) {
    return { fill: "none", stroke: "none" }
  }
  return { fill: "#eaeaea", stroke: "#b9b9b9" }
}
