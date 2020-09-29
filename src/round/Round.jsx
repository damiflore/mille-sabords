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
  getDomNodeRectangle,
} from "src/dom/dom.position.js"
import { useDiceKeptIds, useThreeSkullsOrMoreInCursedArea } from "src/round/round.selectors.js"

export const Round = ({ openScoreboard, onRoundStart, onRoundOver }) => {
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

  React.useEffect(() => {
    onRoundStart()
  }, [])

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
    const chestSlotMap = new Map()
    const domNodeCandidates = []
    Object.keys(chestSlots).forEach((chestSlot) => {
      const chestSlotContent = chestSlots[chestSlot]
      const chestSlotIsEmpty = !chestSlotContent
      if (
        chestSlotIsEmpty ||
        (chestSlotContent.type === "dice" && chestSlotContent.value === dice.id)
      ) {
        const chestSlotDomNode = chestSlotToChestSlotDomNode(chestSlot, { chestRef })
        chestSlotMap.set(chestSlotDomNode, chestSlot)
        domNodeCandidates.push(chestSlotDomNode)
      }
    })
    const closestDomNode = findDomNodeClosestToRectangle(domNodeCandidates, requestedRectangle)
    const closestChestSlot = chestSlotMap.get(closestDomNode)
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

  const getClickEffect = (dice) => {
    if (diceIsInRolledArea(dice)) {
      if (canKeepDice(dice)) {
        return "keep"
      }
      return "none"
    }
    if (diceIsInChest) {
      if (canUnkeepDice(dice)) {
        return "unkeep"
      }
      return "none"
    }
    if (diceIsInCursedArea(dice)) {
      if (canUncurseDice(dice)) {
        return "uncurse"
      }
      return "none"
    }
    return "none"
  }

  const getDropEffect = (dice) => {
    if (diceIsInRolledArea(dice)) {
      if (dropTargetRef.current === rolledAreaRef.current) {
        return "reposition-in-rolled-area"
      }

      if (dropTargetRef.current === chestRef.current) {
        if (canKeepDice(dice)) {
          return "keep"
        }
        return "back-to-rolled-area"
      }

      return "back-to-rolled-area"
    }

    if (diceIsInChest(dice)) {
      if (dropTargetRef.current === chestRef.current) {
        return "reposition-in-chest"
      }

      if (dropTargetRef.current === rolledAreaRef.current) {
        if (canUnkeepDice(dice)) {
          return "unkeep"
        }
        return "back-to-chest"
      }

      return "back-to-chest"
    }

    return "none"
  }

  const [diceAnimationState, dispatchDiceAnimation] = React.useReducer((state, action) => {
    return {
      ...state,
      [action.key]: action.value,
    }
  }, {})

  const animateDiceMoveTo = (dice, from, to) => {
    dispatchDiceAnimation({
      key: dice.id,
      value: {
        from,
        to,
      },
    })
  }

  const animateMoveToRolledArea = (dice, rolledAreaPosition, { dropDiceGesture }) => {
    const absoluteRolledAreaPositionRectangle = rectangleAbsoluteToDomNode(
      {
        left: rolledAreaPosition.x,
        top: rolledAreaPosition.y,
        right: 0,
        bottom: 0,
      },
      rolledAreaRef.current,
    )
    animateDiceMoveTo(
      dice,
      {
        x: dropDiceGesture.diceRectangle.left,
        y: dropDiceGesture.diceRectangle.top,
      },
      {
        x: absoluteRolledAreaPositionRectangle.left,
        y: absoluteRolledAreaPositionRectangle.top,
      },
    )
  }

  const animateDiceMoveToChestSlot = (dice, chestSlot, { dropDiceGesture }) => {
    const destinationSlotDomNode = chestSlotToChestSlotDomNode(chestSlot, {
      chestRef,
    })
    const destinationSlotRectangle = getDomNodeRectangle(destinationSlotDomNode)
    animateDiceMoveTo(
      dice,
      {
        x: dropDiceGesture.diceRectangle.left,
        y: dropDiceGesture.diceRectangle.top,
      },
      {
        x: destinationSlotRectangle.left,
        y: destinationSlotRectangle.top,
      },
    )
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
        cursedAreaRef={cursedAreaRef}
        diceAnimationState={diceAnimationState}
        onDiceClick={(dice) => {
          const clickEffect = getClickEffect(dice)
          console.log(`click dice#${dice.id} -> ${clickEffect} effect`)
          if (clickEffect === "keep") {
            const firstAvailableChestSlot = getFirstAvailableChestSlot()
            // console.log({ chestSlots, firstAvailableChestSlot })
            keepDice(dice, firstAvailableChestSlot)
          } else if (clickEffect === "unkeep") {
            unkeepDice(dice)
          } else if (clickEffect === "uncurse") {
            uncurseDice(dice)
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
          const dropEffect = getDropEffect(dice)
          console.log(`drop dice#${dice.id} -> ${dropEffect} effect`)

          if (dropEffect === "reposition-in-rolled-area") {
            setDiceRolledAreaPosition(
              dice,
              getClosestRolledAreaPosition(dropDiceGesture.diceRectangle),
            )
            // no animation needed, we drop exactly where we want it
          } else if (dropEffect === "back-to-rolled-area") {
            animateMoveToRolledArea(dice, dice.rolledAreaPosition, { dropDiceGesture })
          } else if (dropEffect === "keep") {
            const closestAvailableChestSlot = getClosestAvailableChestSlot(
              dice,
              dropDiceGesture.diceRectangle,
            )
            keepDice(dice, closestAvailableChestSlot)
            animateDiceMoveToChestSlot(dice, closestAvailableChestSlot, { dropDiceGesture })
          } else if (dropEffect === "reposition-in-chest") {
            const closestAvailableChestSlot = getClosestAvailableChestSlot(
              dice,
              dropDiceGesture.diceRectangle,
            )
            const diceChestSlot = diceToChestSlot(dice, { chestSlots })
            if (diceChestSlot !== closestAvailableChestSlot) {
              setDiceChestSlot(dice, closestAvailableChestSlot)
              animateDiceMoveToChestSlot(dice, closestAvailableChestSlot, { dropDiceGesture })
            }
          } else if (dropEffect === "back-to-chest") {
            const diceChestSlot = diceToChestSlot(dice, { chestSlots })
            const diceChestSlotDomNode = chestSlotToChestSlotDomNode(diceChestSlot, { chestRef })
            const diceChestSlotDomNodeRectangle = getDomNodeRectangle(diceChestSlotDomNode)
            animateDiceMoveTo(
              dice,
              {
                x: dropDiceGesture.diceRectangle.left,
                y: dropDiceGesture.diceRectangle.top,
              },
              {
                x: diceChestSlotDomNodeRectangle.left,
                y: diceChestSlotDomNodeRectangle.top,
              },
            )
          } else if (dropEffect === "unkeep") {
            const closestRolledAreaPosition = getClosestRolledAreaPosition(
              dropDiceGesture.diceRectangle,
            )
            setDiceRolledAreaPosition(dice, closestRolledAreaPosition)
            unkeepDice(dice)
            animateMoveToRolledArea(dice, closestRolledAreaPosition, { dropDiceGesture })
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

const diceToChestSlot = (dice, { chestSlots }) => {
  const diceChestSlot = Object.keys(chestSlots).find((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return (
      chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id
    )
  })
  return diceChestSlot
}

const chestSlotToChestSlotDomNode = (chestSlot, { chestRef }) => {
  const chestDomNode = chestRef.current
  const chestSlotDomNode = chestDomNode.querySelector(`[data-chest-slot="${chestSlot}"]`)
  return chestSlotDomNode
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
