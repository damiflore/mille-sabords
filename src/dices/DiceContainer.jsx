import React from "react"
import {
  useDices,
  useDiceCursedIds,
  useDiceRolledIds,
  useChestSlots,
  useWitchUncursedDiceId,
  useScoreMarked,
  useCurrentCardId,
} from "src/main.store.js"
import { cardIdToCard, isWitchCard } from "src/cards/cards.js"
import {
  rectangleRelativeToDomNode,
  findDomNodeClosestToRectangle,
  rectangleAbsoluteToDomNode,
  getDomNodeRectangle,
  domNodeCollidesWithRectangle,
} from "src/dom/dom.position.js"
import { useDiceKeptIds, useThreeSkullsOrMoreInCursedArea } from "src/round/round.selectors.js"
import { Dice } from "src/dices/Dice.jsx"
import { diceIsOnSkull } from "src/dices/dices.js"
import {
  useSetDiceRolledAreaPosition,
  useKeepDice,
  useUnkeepDice,
  useSetDiceChestSlot,
  useUncurseDice,
} from "src/dices/dices.actions.js"

export const DiceContainer = ({
  chestRef,
  rolledAreaRef,
  offscreenRef,
  cursedAreaRef,
  onDiceOverChestChange = () => {},
  onDiceOverRolledAreaChange = () => {},
}) => {
  // global state
  const dices = useDices()
  const chestSlots = useChestSlots()
  const diceKeptIds = useDiceKeptIds()
  const diceRolledIds = useDiceRolledIds()
  const diceCursedIds = useDiceCursedIds()
  const witchUncursedDiceId = useWitchUncursedDiceId()
  const currentCard = cardIdToCard(useCurrentCardId())
  const scoreMarked = useScoreMarked()
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()
  // local state
  const [diceAnimationState, dispatchDiceAnimation] = React.useReducer((state, action) => {
    return {
      ...state,
      [action.key]: action.value,
    }
  }, {})
  // actions
  const setDiceRolledAreaPosition = useSetDiceRolledAreaPosition()
  const keepDice = useKeepDice()
  const unkeepDice = useUnkeepDice()
  const uncurseDice = useUncurseDice()
  const setDiceChestSlot = useSetDiceChestSlot()
  // other
  const dropTargetRef = React.useRef(null)

  const chestDomNode = chestRef.current
  const rolledAreaDomNode = rolledAreaRef.current
  const offscreenDomNode = offscreenRef.current
  const cursedAreaDomNode = cursedAreaRef.current

  if (!chestDomNode) return null
  if (!rolledAreaDomNode) return null
  if (!offscreenDomNode) return null
  if (!cursedAreaDomNode) return null

  return Object.keys(dices).map((diceId) => {
    const dice = dices[diceId]
    return (
      <DiceController
        key={dice.id}
        {...{
          dice,
          diceAnimation: diceAnimationState[dice.id],
          diceKeptIds,
          chestSlots,
          diceRolledIds,
          diceCursedIds,
          witchUncursedDiceId,
          chestDomNode,
          rolledAreaDomNode,
          offscreenDomNode,
          cursedAreaDomNode,
          diceAnimationState,
          onDiceClick: (dice) => {
            const clickEffect = getClickEffect(dice, {
              diceRolledIds,
              diceKeptIds,
              diceCursedIds,
              scoreMarked,
              threeSkullsOrMoreInCursedArea,
              currentCard,
              witchUncursedDiceId,
            })
            // console.log(`click dice#${dice.id} -> ${clickEffect} effect`)
            if (clickEffect === "keep") {
              const firstAvailableChestSlot = firstAvailableChestSlotGetter(chestSlots)
              keepDice(dice, firstAvailableChestSlot)
            } else if (clickEffect === "unkeep") {
              unkeepDice(dice)
            } else if (clickEffect === "uncurse") {
              uncurseDice(dice)
            }
          },
          onDiceDrag: (dice, dragDiceGesture) => {
            dropTargetRef.current = dropTargetGetter({
              dragDiceGesture,
              chestDomNode,
              rolledAreaDomNode,
            })
            const dropEffect = getDropEffect(dice, {
              diceRolledIds,
              diceKeptIds,
              dropTargetRef,
              rolledAreaDomNode,
              chestDomNode,
              scoreMarked,
              threeSkullsOrMoreInCursedArea,
            })
            dragDiceGesture.setDropEffect(dropEffect)
            onDiceOverChestChange(dropEffect === "keep" ? dice : null)
            onDiceOverRolledAreaChange(dropEffect === "unkeep" ? dice : null)
          },
          onDiceDrop: (dice, dropDiceGesture) => {
            const dropEffect = getDropEffect(dice, {
              diceRolledIds,
              diceKeptIds,
              dropTargetRef,
              rolledAreaDomNode,
              chestDomNode,
              scoreMarked,
              threeSkullsOrMoreInCursedArea,
            })
            // console.log(`drop dice#${dice.id} -> ${dropEffect} effect`)

            let dropAnimation = false
            let dropPosition = null

            if (dropEffect === "reposition-in-rolled-area") {
              setDiceRolledAreaPosition(
                dice,
                closestRolledAreaPositionGetter(dropDiceGesture.diceRectangle, rolledAreaDomNode),
              )
              // no animation needed, we drop exactly where we want it
            } else if (dropEffect === "back-to-rolled-area") {
              dropAnimation = true
              dropPosition = rolledAreaDropPositionGetter(
                dice.rolledAreaPosition,
                rolledAreaDomNode,
              )
            } else if (dropEffect === "keep") {
              const closestAvailableChestSlot = closestAvailableChestSlotGetter(dice, {
                chestSlots,
                rectangle: dropDiceGesture.diceRectangle,
                chestDomNode,
              })
              keepDice(dice, closestAvailableChestSlot)
              dropAnimation = true
              dropPosition = chestSlotDropPositionGetter(closestAvailableChestSlot, chestDomNode)
            } else if (dropEffect === "reposition-in-chest") {
              const closestAvailableChestSlot = closestAvailableChestSlotGetter(dice, {
                chestSlots,
                rectangle: dropDiceGesture.diceRectangle,
                chestDomNode,
              })
              const diceChestSlot = diceToChestSlot(dice, chestSlots)
              if (diceChestSlot !== closestAvailableChestSlot) {
                setDiceChestSlot(dice, closestAvailableChestSlot)
                dropAnimation = true
                dropPosition = chestSlotDropPositionGetter(closestAvailableChestSlot, chestDomNode)
              }
            } else if (dropEffect === "back-to-chest") {
              const diceChestSlot = diceToChestSlot(dice, { chestSlots })
              dropAnimation = true
              dropPosition = chestSlotDropPositionGetter(diceChestSlot, chestDomNode)
            } else if (dropEffect === "unkeep") {
              const closestRolledAreaPosition = closestRolledAreaPositionGetter(
                dropDiceGesture.diceRectangle,
                rolledAreaDomNode,
              )
              setDiceRolledAreaPosition(dice, closestRolledAreaPosition)
              unkeepDice(dice)
              dropAnimation = true
              dropPosition = rolledAreaDropPositionGetter(
                closestRolledAreaPosition,
                rolledAreaDomNode,
              )
            }

            if (dropAnimation) {
              dispatchDiceAnimation({
                key: dice.id,
                value: {
                  from: {
                    x: dropDiceGesture.diceRectangle.left,
                    y: dropDiceGesture.diceRectangle.top,
                  },
                  to: dropPosition,
                  onfinish: () => {
                    dispatchDiceAnimation({
                      key: dice.id,
                      value: null,
                    })
                  },
                },
              })
            }
          },
          onDiceDragEnd: () => {
            onDiceOverChestChange(null)
            onDiceOverRolledAreaChange(null)
          },
        }}
      />
    )
  })
}

const getClickEffect = (
  dice,
  {
    diceRolledIds,
    diceKeptIds,
    diceCursedIds,
    scoreMarked,
    threeSkullsOrMoreInCursedArea,
    currentCard,
    witchUncursedDiceId,
  },
) => {
  if (diceIsInRolledAreaGetter(dice, diceRolledIds)) {
    if (keepDiceAllowedGetter(dice, { scoreMarked, threeSkullsOrMoreInCursedArea })) {
      return "keep"
    }
    return "none"
  }

  if (diceIsInChestGetter(dice, diceKeptIds)) {
    if (unkeepDiceAllowedGetter(dice, { scoreMarked, threeSkullsOrMoreInCursedArea })) {
      return "unkeep"
    }
    return "none"
  }

  if (diceIsInCursedAreaGetter(dice, diceCursedIds)) {
    if (
      uncurseDiceAllowedGetter(dice, {
        scoreMarked,
        threeSkullsOrMoreInCursedArea,
        currentCard,
        witchUncursedDiceId,
      })
    ) {
      return "uncurse"
    }
    return "none"
  }

  return "none"
}

const getDropEffect = (
  dice,
  {
    diceRolledIds,
    diceKeptIds,
    dropTargetRef,
    rolledAreaDomNode,
    chestDomNode,
    scoreMarked,
    threeSkullsOrMoreInCursedArea,
  },
) => {
  if (diceIsInRolledAreaGetter(dice, diceRolledIds)) {
    if (dropTargetRef.current === rolledAreaDomNode) {
      return "reposition-in-rolled-area"
    }

    if (dropTargetRef.current === chestDomNode) {
      if (keepDiceAllowedGetter(dice, { scoreMarked, threeSkullsOrMoreInCursedArea })) {
        return "keep"
      }
      return "back-to-rolled-area"
    }

    return "back-to-rolled-area"
  }

  if (diceIsInChestGetter(dice, diceKeptIds)) {
    if (dropTargetRef.current === chestDomNode) {
      return "reposition-in-chest"
    }

    if (dropTargetRef.current === rolledAreaDomNode) {
      if (unkeepDiceAllowedGetter(dice, { scoreMarked, threeSkullsOrMoreInCursedArea })) {
        return "unkeep"
      }
      return "back-to-chest"
    }

    return "back-to-chest"
  }

  return "none"
}

const dropTargetGetter = ({ dragDiceGesture, chestDomNode, rolledAreaDomNode }) => {
  const diceIsOverChest = domNodeCollidesWithRectangle(chestDomNode, dragDiceGesture.diceRectangle)
  if (diceIsOverChest) {
    return chestDomNode
  }

  const diceIsOverRolledArea = domNodeCollidesWithRectangle(
    rolledAreaDomNode,
    dragDiceGesture.diceRectangle,
  )
  if (diceIsOverRolledArea) {
    return rolledAreaDomNode
  }

  return null
}

const diceIsInRolledAreaGetter = (dice, diceRolledIds) => diceRolledIds.includes(dice.id)
const diceIsInChestGetter = (dice, diceKeptIds) => diceKeptIds.includes(dice.id)
const diceIsInCursedAreaGetter = (dice, diceCursedIds) => diceCursedIds.includes(dice.id)

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

const rolledAreaDropPositionGetter = (rolledAreaPosition, rolledAreaDomNode) => {
  const absoluteRolledAreaPositionRectangle = rectangleAbsoluteToDomNode(
    {
      left: rolledAreaPosition.x,
      top: rolledAreaPosition.y,
      right: 0,
      bottom: 0,
    },
    rolledAreaDomNode,
  )
  return {
    x: absoluteRolledAreaPositionRectangle.left,
    y: absoluteRolledAreaPositionRectangle.top,
  }
}

const chestSlotDropPositionGetter = (chestSlot, chestDomNode) => {
  const destinationSlotDomNode = chestSlotToChestSlotDomNode(chestSlot, chestDomNode)
  const destinationSlotRectangle = getDomNodeRectangle(destinationSlotDomNode)
  return {
    x: destinationSlotRectangle.left,
    y: destinationSlotRectangle.top,
  }
}

const closestRolledAreaPositionGetter = (requestedRectangle, rolledAreaDomNode) => {
  const rectangle = rectangleRelativeToDomNode(requestedRectangle, rolledAreaDomNode)
  const closestRolledAreaPosition = {
    x: rectangle.left,
    y: rectangle.top,
  }
  return closestRolledAreaPosition
}

const firstAvailableChestSlotGetter = (chestSlots) => {
  const firstAvailableChestSlot = Object.keys(chestSlots).find((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return !chestSlotContent
  })
  return firstAvailableChestSlot
}

const closestAvailableChestSlotGetter = (dice, { chestSlots, rectangle, chestDomNode }) => {
  const chestSlotMap = new Map()
  const domNodeCandidates = []
  Object.keys(chestSlots).forEach((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    const chestSlotIsEmpty = !chestSlotContent
    if (
      chestSlotIsEmpty ||
      (chestSlotContent.type === "dice" && chestSlotContent.value === dice.id)
    ) {
      const chestSlotDomNode = chestSlotToChestSlotDomNode(chestSlot, chestDomNode)
      chestSlotMap.set(chestSlotDomNode, chestSlot)
      domNodeCandidates.push(chestSlotDomNode)
    }
  })
  const closestDomNode = findDomNodeClosestToRectangle(domNodeCandidates, rectangle)
  const closestChestSlot = chestSlotMap.get(closestDomNode)
  return closestChestSlot
}

const diceToChestSlot = (dice, chestSlots) => {
  const diceChestSlot = Object.keys(chestSlots).find((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return (
      chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id
    )
  })
  return diceChestSlot
}

const chestSlotToChestSlotDomNode = (chestSlot, chestDomNode) => {
  const chestSlotDomNode = chestDomNode.querySelector(`[data-chest-slot="${chestSlot}"]`)
  return chestSlotDomNode
}

const DiceController = ({
  dice,
  diceAnimation,
  diceKeptIds,
  chestSlots,
  diceRolledIds,
  diceCursedIds,
  witchUncursedDiceId,
  chestDomNode,
  rolledAreaDomNode,
  offscreenDomNode,
  cursedAreaDomNode,
  ...rest
}) => {
  const propsFromLocation = diceLocationToInfo(dice, {
    // chest
    diceKeptIds,
    chestSlots,
    chestDomNode,
    // rolled
    diceRolledIds,
    rolledAreaDomNode,
    // cursed
    diceCursedIds,
    cursedAreaDomNode,
    // offscreen
    offscreenDomNode,
  })
  const { parentNode } = propsFromLocation
  const diceIsGoingToBeCursed =
    dice.id !== witchUncursedDiceId && parentNode === rolledAreaDomNode && diceIsOnSkull(dice)
  const diceInCursedArea = parentNode === cursedAreaDomNode

  return (
    <Dice
      {...{
        dice,
        diceAnimation,
        ...propsFromLocation,
        disapear: diceIsGoingToBeCursed,
        appear: diceInCursedArea,
        ...rest,
      }}
    />
  )
}

const diceLocationToInfo = (
  dice,
  {
    // chest
    diceKeptIds,
    chestSlots,
    chestDomNode,
    // rolled
    diceRolledIds,
    rolledAreaDomNode,
    // cursed
    diceCursedIds,
    cursedAreaDomNode,
    // offscreen
    offscreenDomNode,
  },
) => {
  if (diceKeptIds.includes(dice.id)) {
    const diceChestSlot = Object.keys(chestSlots).find(
      (chestSlot) =>
        chestSlots[chestSlot] &&
        chestSlots[chestSlot].type === "dice" &&
        chestSlots[chestSlot].value === dice.id,
    )
    return {
      parentNode: chestDomNode.querySelector(`[data-chest-slot="${diceChestSlot}"]`),
      rotation: 0,
      draggable: true,
    }
  }

  if (diceRolledIds.includes(dice.id)) {
    return {
      parentNode: rolledAreaDomNode,
      rotation: dice.rotation,
      x: dice.rolledAreaPosition.x,
      y: dice.rolledAreaPosition.y,
      draggable: true,
    }
  }

  if (diceCursedIds.includes(dice.id)) {
    return {
      parentNode: cursedAreaDomNode,
      rotation: 0,
      draggable: false,
    }
  }

  return {
    parentNode: offscreenDomNode,
    rotation: 0,
    draggable: false,
  }
}
