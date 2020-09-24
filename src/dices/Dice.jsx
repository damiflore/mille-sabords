/* eslint-disable import/max-dependencies */
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
import {
  useWitchUncursedDiceId,
  useScoreMarked,
  useCurrentCard,
  useChestSlots,
  useDicesRolled,
  useDicesCursed,
} from "src/main.store.js"
import { useDiceDomNode, useDiceDomNodeSetter, useMainDomNode } from "src/dom/dom.main.js"
import { useThreeSkullsOrMoreInCursedArea } from "src/round/round.selectors.js"
import { diceSize } from "src/dices/dicePosition.js"
import { diceIsOnSkull, diceToVisibleSymbol } from "src/dices/dices.js"
import { enableDragGesture } from "src/drag/drag.js"
import { isWitchCard } from "src/cards/cards.js"

const { useEffect, useState } = React

export const Dice = ({ dice, onDiceDrag }) => {
  // state from global store context
  const currentCard = useCurrentCard()
  const witchUncursedDiceId = useWitchUncursedDiceId()
  const scoreMarked = useScoreMarked()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()
  const chestSlots = useChestSlots()
  const dicesRolled = useDicesRolled()
  const dicesCursed = useDicesCursed()
  // state from other contexts
  const mainDomNode = useMainDomNode()
  const diceDomNode = useDiceDomNode(dice.id)
  const diceDomNodeSetter = useDiceDomNodeSetter(dice.id)
  // local states
  const [diceGripped, diceGrippedSetter] = useState(false)
  // a small move is a drag gesture but
  // not yet a drag intent
  // long grip or big enough move set drag intent to true
  const [dragIntent, setDragIntent] = useState(false)
  const [dragGesture, setDragGesture] = useState(null)

  const onSkull = diceIsOnSkull(dice)
  const diceRotation = dice.rotation
  // peut avoir une position dans la rolledArea ou dans le chest etc mais c'est
  // maintenant indépendant
  const diceX = dragGesture ? dragGesture.x : 0
  const diceY = dragGesture ? dragGesture.y : 0
  const becomesCursed = false
  const becomesUncursed = false
  const { diceIsInChest, diceIsInCursedArea, diceIsInRolledArea } = diceLocationGetter(dice, {
    chestSlots,
    dicesRolled,
    dicesCursed,
  })
  const draggable = diceIsInChest || diceIsInRolledArea

  useEffect(() => {
    if (!draggable || !diceDomNode || !mainDomNode) {
      return () => {}
    }

    let dragIntentTimeout
    const dropHandlerMap = new Map()
    const disableDragGesture = enableDragGesture(diceDomNode, {
      onGrip: () => {
        diceGrippedSetter(true)
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
        const mainDomNodeRect = getDomNodeRectangle(mainDomNode)
        const diceRectangle = rectangleInsideOf(diceDesiredRect, mainDomNodeRect)
        setDragGesture({ x: diceRectangle.left, y: diceRectangle.top })
        onDiceDrag(dice, { diceRectangle })
      },
      onRelease: ({ x, y }) => {
        diceGrippedSetter(false)
        // setTimeout is to ensure the click cannot happen just after mouseup
        dragIntentTimeout = setTimeout(() => setDragIntent(false))
        setDragGesture(null)

        const diceRectangle = {
          left: x,
          right: x + diceSize,
          top: y,
          bottom: y + diceSize,
        }
        dropHandlerMap.forEach((dropHandler) => dropHandler({ diceRectangle }))
      },
      onCancel: () => {
        diceGrippedSetter(false)
        setDragIntent(false)
        setDragGesture(null)
      },
    })
    return () => {
      disableDragGesture()
      clearTimeout(dragIntentTimeout)
    }
  }, [draggable, diceDomNode, mainDomNode])

  return (
    <svg
      data-dice-id={dice.id}
      onClick={() => {
        if (dragIntent) {
          return
        }

        if (diceIsInRolledArea) {
          const keepDiceAllowed = keepDiceAllowedGetter(dice, {
            scoreMarked,
            threeSkullsOrMoreInCursedArea,
          })
          if (!keepDiceAllowed) {
            return
          }
          // faut trouver les coordonées du free slot de mettre le dé a cet endroit
          const freeSlot = Object.keys(chestSlots).find((key) => !chestSlots[key])
          keepDice(dice, freeSlot)
        }

        if (diceIsInChest) {
          const unkeepDiceAllowed = unkeepDiceAllowedGetter(dice, {
            scoreMarked,
            threeSkullsOrMoreInCursedArea,
          })
          if (!unkeepDiceAllowed) {
            return
          }
          // faut trouver les coordonées dispo dans rolled area et bouger le dé dedans
        }
        if (diceIsInCursedArea) {
          const uncurseDiceAllowed = uncurseDiceAllowedGetter(dice, {
            scoreMarked,
            threeSkullsOrMoreInCursedArea,
            currentCard,
            witchUncursedDiceId,
          })
          if (!uncurseDiceAllowed) {
            return
          }
          // trouver une place dans rolled area et le bouger la dedans
        }
      }}
      className={stringifyClassNames([
        "dice",
        ...(becomesCursed ? ["dice-cursed-disapear"] : []),
        ...(becomesUncursed ? ["dice-cursed-appear"] : []),
      ])}
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

const diceLocationGetter = (dice, { chestSlots, dicesCursed, dicesRolled }) => {
  if (diceIsInChestGetter(dice, { chestSlots })) {
    return {
      diceIsChest: true,
      diceIsInCursedArea: false,
      diceIsInRolledArea: false,
    }
  }
  const inCursedArea = dicesCursed.includes(dice.id)
  if (inCursedArea) {
    return {
      diceIsChest: false,
      diceIsInCursedArea: true,
      diceIsInRolledArea: false,
    }
  }
  if (diceIsInRolledAreaGetter(dice, { dicesRolled })) {
    return {
      diceIsChest: false,
      diceIsInCursedArea: false,
      diceIsInRolledArea: true,
    }
  }

  // happens at the begining of a round where the dice is somewhere, unvisible
  return {
    diceIsChest: false,
    diceIsInCursedArea: false,
    diceIsInRolledArea: false,
  }
}

export const diceIsInChestGetter = (dice, { chestSlots }) => {
  return Object.keys(chestSlots).some((chestSlot) => diceIsInChestSlot(dice, chestSlots[chestSlot]))
}

const diceIsInChestSlot = (dice, chestSlotContent) =>
  chestSlotContent.type === "dice" && chestSlotContent.value === dice.id

export const diceIsInRolledAreaGetter = (dice, { dicesRolled }) => dicesRolled.include(dice.id)

const keepDiceAllowedGetter = (dice, { scoreMarked, threeSkullsOrMoreInCursedArea }) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    return false
  }

  return true
}

const unkeepDiceAllowedGetter = (dice, { scoreMarked, threeSkullsOrMoreInCursedArea }) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    return false
  }

  return true
}

const uncurseDiceAllowedGetter = (
  dice,
  { scoreMarked, threeSkullsOrMoreInCursedArea, currentCard, witchUncursedDiceId },
) => {
  if (scoreMarked) {
    return false
  }

  if (threeSkullsOrMoreInCursedArea) {
    return false
  }

  if (!isWitchCard(currentCard)) {
    return false
  }

  if (witchUncursedDiceId !== dice.id) {
    return false
  }

  return true
}
