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
  useSetDiceRolledAreaPosition,
  useKeepDice,
  useUnkeepDice,
  useSetDiceChestSlot,
  useUncurseDice,
} from "src/dices/dices.actions.js"
import {
  domNodeCollidesWithRectangle,
  rectangleRelativeToDomNode,
  findDomNodeClosestToRectangle,
  rectangleAbsoluteToDomNode,
} from "src/dom/dom.position.js"
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
  const setDiceRolledAreaPosition = useSetDiceRolledAreaPosition()
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

  const getFirstAvailableChestSlot = () => {
    const firstAvailableChestSlot = Object.keys(chestSlots).find((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      return !chestSlotContent
    })
    return firstAvailableChestSlot
  }

  const getClosestAvailableChestSlot = (dice, requestedRectangle) => {
    const chestDomNode = chestRef.current
    const chestSlotMap = {}
    const domNodeCandidates = []
    Object.keys(chestSlots).forEach((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      const chestSlotIsEmpty = !chestSlotContent
      if (
        chestSlotIsEmpty ||
        (chestSlotContent.type === "dice" && chestSlotContent.value === dice.id)
      ) {
        const chestSlotDomNode = chestDomNode.querySelector(`[data-chest-slot="${chestSlot}"]`)
        chestSlotMap[chestSlot] = chestSlotDomNode
        domNodeCandidates.push(chestSlotDomNode)
      }
    })
    const closestDomNode = findDomNodeClosestToRectangle(domNodeCandidates, requestedRectangle)
    const closestChestSlot = chestSlotMap[closestDomNode]
    return closestChestSlot
  }

  const getClosestRolledAreaPosition = (requestedRectangle) => {
    const rectangle = rectangleRelativeToDomNode(requestedRectangle, rolledAreaRef.current)
    const closestRolledAreaPosition = {
      x: rectangle.left,
      y: rectangle.top,
    }
    return closestRolledAreaPosition
  }

  const getClickIntent = (dice) => {
    if (diceIsInRolledArea(dice)) {
      return "keep"
    }
    if (diceIsInChest) {
      return "unkeep"
    }
    if (diceIsInCursedArea(dice)) {
      return "uncurse"
    }
    return "other"
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

  const [diceAnimationState, dispatchDiceAnimation] = React.useReducer((state, action) => {
    return {
      ...state,
      [action.key]: action.value,
    }
  }, {})

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
        cursedAreaRef={cursedAreaRef}
        diceAnimationState={diceAnimationState}
        onDiceClick={(dice) => {
          const clickIntent = getClickIntent(dice)
          if (clickIntent === "keep") {
            if (canKeepDice(dice)) {
              keepDice(dice, getFirstAvailableChestSlot())
            }
            return
          }

          if (clickIntent === "unkeep") {
            if (canUnkeepDice(dice)) {
              unkeepDice(dice)
            }
            return
          }

          if (clickIntent === "uncurse") {
            if (canUncurseDice(dice)) {
              uncurseDice(dice)
            }
            return
          }
        }}
        onDiceDrag={(dice, dragDiceGesture) => {
          let dropAllowed = false
          let dropTarget = null

          const chestDomNode = chestRef.current
          const diceIsOverChest = domNodeCollidesWithRectangle(
            chestDomNode,
            dragDiceGesture.diceRectangle,
          )
          if (diceIsOverChest) {
            dropTarget = chestRef.current
            dropAllowed = canKeepDice(dice)
          }

          const rolledAreaDomNode = rolledAreaRef.current
          const diceIsOverRolledArea = domNodeCollidesWithRectangle(
            rolledAreaDomNode,
            dragDiceGesture.diceRectangle,
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
              const chestSlot = getClosestAvailableChestSlot(dice, dropDiceGesture.diceRectangle)
              setDiceChestSlot(dice, chestSlot)
              keepDice(dice, chestSlot)
            } else {
              // todo: animation pour repositionner le dé dans rolled area
            }
          } else if (dropIntent === "unkeep") {
            if (canUnkeepDice(dice)) {
              setDiceRolledAreaPosition(
                dice,
                getClosestRolledAreaPosition(dropDiceGesture.diceRectangle),
              )
              unkeepDice(dice)
            } else {
              // todo: animation pour replacer le dé a sa position pre drag
            }
          } else if (dropIntent === "reposition-in-rolled-area") {
            setDiceRolledAreaPosition(
              dice,
              getClosestRolledAreaPosition(dropDiceGesture.diceRectangle),
            )
          } else if (dropIntent === "reposition-in-chest") {
            setDiceChestSlot(
              dice,
              getClosestAvailableChestSlot(dice, dropDiceGesture.diceRectangle),
            )
          } else {
            const absoluteToRectangle = rectangleAbsoluteToDomNode(
              {
                left: dice.rolledAreaPosition.x,
                top: dice.rolledAreaPosition.y,
                right: 0,
                bottom: 0,
              },
              rolledAreaRef.current,
            )
            dispatchDiceAnimation({
              key: dice.id,
              value: {
                from: {
                  x: dropDiceGesture.diceRectangle.left,
                  y: dropDiceGesture.diceRectangle.top,
                },
                to: { x: absoluteToRectangle.left, y: absoluteToRectangle.top },
              },
            })
          }
        }}
        onDiceAnimationEnd={(dice) => {
          dispatchDiceAnimation({
            key: dice.id,
            value: null,
          })
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
