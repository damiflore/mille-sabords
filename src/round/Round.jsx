/* eslint-disable import/max-dependencies */
import React from "react"

import {
  useChestSlots,
  useDiceRolledIds,
  useDiceCursedIds,
  useWitchUncursedDiceId,
  useScoreMarked,
  useCurrentCardId,
} from "src/main.store.js"
import { cardIdToCard, isWitchCard } from "src/cards/cards.js"
import { GameEffects } from "src/round/round.effects.js"
import { DiceOnGoing } from "src/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "src/chest/Chest.jsx"
import { Header } from "src/header/Header.jsx"
import { Footer } from "src/footer/Footer.jsx"
import { SkullIsland } from "src/skull-island/SkullIsland.jsx"
import { DiceContainer } from "src/dices/DiceContainer.jsx"
import {
  useMoveDice,
  useKeepDice,
  useUnkeepDice,
  useSetDiceChestSlot,
  useUncurseDice,
} from "src/dices/dices.actions.js"
import {
  rectangleCollidesWithRectangle,
  rectangleInsideOf,
  getDomNodeRectangle,
  findClosestRectangle,
} from "src/helper/rectangle.js"
import { useDiceKeptIds, useThreeSkullsOrMoreInCursedArea } from "src/round/round.selectors.js"

export const Round = ({ openScoreboard, onRoundOver }) => {
  const chestSlots = useChestSlots()
  const diceKeptIds = useDiceKeptIds()
  const diceRolledIds = useDiceRolledIds()
  const diceCursedIds = useDiceCursedIds()
  const currentCard = cardIdToCard(useCurrentCardId())
  const witchUncursedDiceId = useWitchUncursedDiceId()
  const scoreMarked = useScoreMarked()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()
  const moveDice = useMoveDice()
  const keepDice = useKeepDice()
  const unkeepDice = useUnkeepDice()
  const uncurseDice = useUncurseDice()
  const setDiceChestSlot = useSetDiceChestSlot()

  const rolledAreaRef = React.useRef(null)
  const chestRef = React.useRef(null)
  const cursedAreaRef = React.useRef(null)
  const offscreenRef = React.useRef(null)
  const [dragoverGesture, dragoverGestureSetter] = React.useState(null)
  const dropTargetRef = React.useRef(null)

  const canKeepDice = (dice) =>
    keepDiceAllowedGetter(dice, {
      scoreMarked,
      threeSkullsOrMoreInCursedArea,
    })

  const canUnkeepDice = (dice) =>
    unkeepDiceAllowedGetter(dice, {
      scoreMarked,
      threeSkullsOrMoreInCursedArea,
    })

  const canUncurseDice = (dice) =>
    uncurseDiceAllowedGetter(dice, {
      scoreMarked,
      threeSkullsOrMoreInCursedArea,
      currentCard,
      witchUncursedDiceId,
    })

  const diceIsInRolledArea = (dice) => diceRolledIds.includes(dice.id)
  const diceIsInCursedArea = (dice) => diceCursedIds.includes(dice.id)
  const diceIsInChest = (dice) => diceKeptIds.includes(dice.id)

  const moveDiceIntoChestFirstAvailableSlot = (dice) => {
    const chestDomNode = chestRef.current
    const firstAvailableChestSlot = Object.keys(chestSlots).find((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      return !chestSlotContent
    })
    const rectangle = getDomNodeRectangle(
      chestDomNode.querySelector(`[data-chest-slot="${firstAvailableChestSlot}"]`),
    )
    dice.rotation = 0
    moveDice(dice, {
      x: rectangle.left,
      y: rectangle.top,
    })
    return firstAvailableChestSlot
  }

  const moveDiceIntoChest = (dice, requestedRectangle) => {
    const chestDomNode = chestRef.current
    const rectangleToChestSlotMap = new Map()
    const rectangleCandidates = []
    Object.keys(chestSlots).forEach((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      const chestSlotIsEmpty = !chestSlotContent
      if (
        chestSlotIsEmpty ||
        (chestSlotContent.type === "dice" && chestSlotContent.value === dice.id)
      ) {
        const chestSlotDomNode = chestDomNode.querySelector(`[data-chest-slot="${chestSlot}"]`)
        const rectangle = getDomNodeRectangle(chestSlotDomNode)
        rectangleToChestSlotMap.set(rectangle, chestSlot)
        rectangleCandidates.push(rectangle)
      }
    })
    const closestRectangle = findClosestRectangle(requestedRectangle, rectangleCandidates)
    const closestChestSlot = rectangleToChestSlotMap.get(closestRectangle)
    dice.rotation = 0
    moveDice(dice, {
      x: closestRectangle.left,
      y: closestRectangle.top,
    })
    return closestChestSlot
  }

  const moveDiceBackIntoRolledArea = (dice) => {
    dice.rotation = dice.rolledAreaRotation
    moveDice(dice, {
      x: dice.rolledAreaPosition.x,
      y: dice.rolledAreaPosition.y,
    })
  }

  const moveDiceIntoRolledArea = (dice, requestedRectangle) => {
    const rolledAreaDomNode = rolledAreaRef.current
    const rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode)
    const diceRectangle = rectangleInsideOf(requestedRectangle, rolledAreaDomNodeRectangle)
    dice.rolledAreaPosition = { x: diceRectangle.left, y: diceRectangle.top }
    dice.rotation = dice.rolledAreaRotation
    moveDice(dice, {
      x: diceRectangle.left,
      y: diceRectangle.top,
    })
  }

  const getDropIntent = (dice) => {
    if (diceIsInRolledArea(dice)) {
      if (dropTargetRef.current === rolledAreaRef.current) {
        return "reposition-in-rolled-area"
      }

      if (dropTargetRef.current === chestRef.current) {
        return "keep"
      }

      return "none"
    }

    if (diceIsInChest(dice)) {
      if (dropTargetRef.current === chestRef.current) {
        return "reposition-in-chest"
      }

      if (dropTargetRef.current === rolledAreaRef.current) {
        return "unkeep"
      }

      return "none"
    }

    return "none"
  }

  return (
    <div className="round-container">
      <GameEffects />
      <Header openScoreboard={openScoreboard} />
      <div className="chest-and-skulls">
        <Chest chestRef={chestRef} dragoverGesture={dragoverGesture} />
        <SkullIsland cursedAreaRef={cursedAreaRef} />
      </div>
      <DiceOnGoing
        rolledAreaRef={rolledAreaRef}
        offscreenRef={offscreenRef}
        dragoverGesture={dragoverGesture}
      />
      <Footer onRoundOver={onRoundOver} rolledAreaRef={rolledAreaRef} />
      <DiceContainer
        chestRef={chestRef}
        rolledAreaRef={rolledAreaRef}
        offscreenRef={offscreenRef}
        onDiceClick={(dice) => {
          if (diceIsInRolledArea(dice)) {
            if (canKeepDice(dice)) {
              const firstAvailableChestSlot = moveDiceIntoChestFirstAvailableSlot(dice)
              keepDice(dice, firstAvailableChestSlot)
            }
            return
          }

          if (diceIsInChest(dice)) {
            if (canUnkeepDice(dice)) {
              moveDiceBackIntoRolledArea(dice)
              unkeepDice(dice)
            }
            return
          }

          if (diceIsInCursedArea(dice)) {
            if (canUncurseDice(dice)) {
              moveDiceBackIntoRolledArea(dice)
              uncurseDice(dice)
            }
            return
          }
        }}
        onDiceDrag={(dice, dragDiceGesture) => {
          let dropAllowed = false
          let dropTarget = null

          const chestDomNode = chestRef.current
          const chestDomNodeRectangle = getDomNodeRectangle(chestDomNode)
          const diceIsOverChest = rectangleCollidesWithRectangle(
            dragDiceGesture.diceRectangle,
            chestDomNodeRectangle,
          )
          if (diceIsOverChest) {
            dropTarget = chestDomNode
            dropAllowed = canKeepDice(dice)
          }

          const rolledAreaDomNode = rolledAreaRef.current
          const rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode)
          const diceIsOverRolledArea = rectangleCollidesWithRectangle(
            dragDiceGesture.diceRectangle,
            rolledAreaDomNodeRectangle,
          )
          if (diceIsOverRolledArea) {
            dropTarget = rolledAreaDomNode
            dropAllowed = canUnkeepDice(dice)
          }

          dragoverGestureSetter({
            dropPayload: dice,
            dropTarget,
            dropAllowed,
          })
          dropTargetRef.current = dropTarget
        }}
        onDiceDrop={(dice, dropDiceGesture) => {
          const dropIntent = getDropIntent(dice)
          console.log("drop", { dice, diceKeptIds, diceRolledIds, dropIntent })

          if (dropIntent === "keep") {
            if (canKeepDice(dice)) {
              const chestSlot = moveDiceIntoChest(dice, dropDiceGesture.diceRectangle)
              setDiceChestSlot(dice, chestSlot)
              keepDice(dice, chestSlot)
            } else {
              // todo: animation pour repositionner le dé dans rolled area
            }
          } else if (dropIntent === "unkeep") {
            if (canUnkeepDice(dice)) {
              moveDiceIntoRolledArea(dice, dropDiceGesture.diceRectangle)
              unkeepDice(dice)
            } else {
              // todo: animation pour replacer le dé a sa position pre drag
            }
          } else if (dropIntent === "reposition-in-rolled-area") {
            moveDiceIntoRolledArea(dice, dropDiceGesture.diceRectangle)
          } else if (dropIntent === "reposition-in-chest") {
            const chestSlot = moveDiceIntoChest(dice, dropDiceGesture.diceRectangle)
            setDiceChestSlot(dice, chestSlot)
          } else {
            // todo: animation pour replacer le dé a sa position pre drag
          }
        }}
        onDiceDragEnd={() => {
          dragoverGestureSetter(null)
        }}
      />
    </div>
  )
}

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
