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
import { useThreeSkullsOrMoreInCursedArea } from "src/round/round.selectors.js"
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
  offscreenDomNode,
  chestDomNode,
  rolledAreaDomNode,
  cursedAreaDomNode,
  onDiceOverChestChange = () => {},
  onDiceOverRolledAreaChange = () => {},
}) => {
  // global state
  const dices = useDices()
  const chestSlots = useChestSlots()
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

  return Object.keys(dices).map((diceId) => {
    const dice = dices[diceId]

    const diceLocation = diceToLocation(dice, { chestSlots, diceRolledIds, diceCursedIds })
    const propsFromLocation = diceLocationToProps(diceLocation, {
      chestDomNode,
      rolledAreaDomNode,
      cursedAreaDomNode,
      offscreenDomNode,
    })
    const { parentNode } = propsFromLocation
    const diceIsGoingToBeCursed =
      dice.id !== witchUncursedDiceId && parentNode === rolledAreaDomNode && diceIsOnSkull(dice)
    const diceInCursedArea = parentNode === cursedAreaDomNode

    return (
      <Dice
        key={dice.id}
        {...{
          ...propsFromLocation,
          dice,
          diceAnimation: diceAnimationState[dice.id],
          witchUncursedDiceId,
          disapear: diceIsGoingToBeCursed,
          appear: diceInCursedArea,
          onDiceClick: (dice) => {
            const clickEffect = getClickEffect(dice, {
              diceRolledIds,
              chestSlots,
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
              chestSlots,
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
              chestSlots,
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
              const closestRolledAreaPosition = closestRolledAreaPositionGetter(
                dropDiceGesture.diceRectangle,
                rolledAreaDomNode,
              )
              const highestRolledAreaZIndex = highestRolledAreaZIndexGetter(dice, {
                dices,
                diceRolledIds,
              })
              setDiceRolledAreaPosition(dice, closestRolledAreaPosition, highestRolledAreaZIndex)
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
              const diceChestSlot = diceToChestSlot(dice, chestSlots)
              dropAnimation = true
              dropPosition = chestSlotDropPositionGetter(diceChestSlot, chestDomNode)
            } else if (dropEffect === "unkeep") {
              const closestRolledAreaPosition = closestRolledAreaPositionGetter(
                dropDiceGesture.diceRectangle,
                rolledAreaDomNode,
              )
              setDiceRolledAreaPosition(
                dice,
                closestRolledAreaPosition,
                highestRolledAreaZIndexGetter(dice, { dices, diceRolledIds }),
              )
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
                    // at the end of dice animation, dice is flickering briely
                    // (moving somewhere on the page and going back to where it's supposed to be)
                    // the following setTimeout fixes this
                    // of course we should improve that because it's an hint there is a deeper
                    // issue to resolve.
                    setTimeout(() => {
                      dispatchDiceAnimation({
                        key: dice.id,
                        value: null,
                      })
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
    chestSlots,
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

  if (diceIsInChestGetter(dice, chestSlots)) {
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
    chestSlots,
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

  if (diceIsInChestGetter(dice, chestSlots)) {
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
const diceIsInChestGetter = (dice, chestSlots) =>
  Object.keys(chestSlots).some((chestSlot) => {
    const chestSlotContent = chestSlots[chestSlot]
    return (
      chestSlotContent && chestSlotContent.type === "dice" && chestSlotContent.value === dice.id
    )
  })
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
    // + 5 is because dice is centered in the chest slot
    x: destinationSlotRectangle.left + 5,
    y: destinationSlotRectangle.top + 5,
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

const highestRolledAreaZIndexGetter = (dice, { diceRolledIds, dices }) => {
  if (diceRolledIds.length === 0) {
    return 1
  }
  const diceWithHighestZIndex = diceRolledIds.slice(1).reduce((previous, diceId) => {
    const dice = dices[diceId]
    const diceZIndex = dice.rolledAreaZIndex
    if (diceZIndex > previous.rolledAreaZIndex) return dice
    return previous
  }, dices[diceRolledIds[0]])
  if (diceWithHighestZIndex === dice) return dice.rolledAreaZIndex
  return diceWithHighestZIndex.rolledAreaZIndex + 1
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

const diceToLocation = (dice, { chestSlots, diceRolledIds, diceCursedIds }) => {
  const diceChestSlot = Object.keys(chestSlots).find(
    (chestSlot) =>
      chestSlots[chestSlot] &&
      chestSlots[chestSlot].type === "dice" &&
      chestSlots[chestSlot].value === dice.id,
  )
  if (diceChestSlot) {
    return {
      type: "chest-slot",
      value: diceChestSlot,
    }
  }

  if (diceRolledIds.includes(dice.id)) {
    return {
      type: "rolled-area",
      value: {
        ...dice.rolledAreaPosition,
        rotation: dice.rotation,
        zIndex: dice.rolledAreaZIndex,
      },
    }
  }

  if (diceCursedIds.includes(dice.id)) {
    return {
      type: "cursed-area",
      value: undefined,
    }
  }

  return {
    type: "offscreen-area",
  }
}

const diceLocationToProps = (
  { type, value },
  { chestDomNode, rolledAreaDomNode, cursedAreaDomNode, offscreenDomNode },
) => {
  if (type === "chest-slot") {
    return {
      parentNode: chestDomNode.querySelector(`[data-chest-slot="${value}"]`),
      rotation: 0,
      draggable: true,
    }
  }

  if (type === "rolled-area") {
    return {
      parentNode: rolledAreaDomNode,
      zIndex: value.zIndex,
      rotation: value.rotation,
      x: value.x,
      y: value.y,
      draggable: true,
    }
  }

  if (type === "cursed-area") {
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
