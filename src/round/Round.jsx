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

const { useMemo } = React

export const Round = ({ openScoreboard, onRoundOver }) => {
  /*
  https://github.com/facebook/react/issues/15156#issuecomment-474590693

  useMemo usage below means the components won't be re-rendered when game global state changes
  and it's fine because as you can see component structure is not conditioned by the gameState or anything.
  Every descendant will still be re-rendered by react and if some component are expensive to render
  they can be wrapped by useMemo with the same pattern.
  (Don't forget to pass dependencies as second arg if there is any).

  There is no real need for useMemo here: it's kept as an example.
  */

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

  const [rolledAreaDragOverGesture, rolledAreaDragOverGestureSetter] = React.useState(null)
  const [chestDragOverGesture, chestDragOverGestureSetter] = React.useState(null)
  const rolledAreaRef = React.useRef(null)
  const chestRef = React.useRef(null)

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

    moveDice(dice, {
      x: rectangle.rectange.left,
      y: rectangle.rectange.top,
    })
    return firstAvailableChestSlot
  }

  const moveDiceBackIntoRolledArea = (dice) => {
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
    moveDice(dice, {
      x: diceRectangle.left,
      y: diceRectangle.top,
    })
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
    moveDice(dice, {
      x: closestRectangle.left,
      y: closestRectangle.top,
    })
    return closestChestSlot
  }

  const getDropIntent = (dice) => {
    if (diceIsInRolledArea(dice)) {
      if (rolledAreaDragOverGesture) {
        return "reposition-in-rolled-area"
      }

      if (chestDragOverGesture) {
        return "keep"
      }

      return "none"
    }

    if (diceIsInChest(dice)) {
      if (chestDragOverGesture) {
        return "reposition-in-chest"
      }

      if (rolledAreaDragOverGesture) {
        return "unkeep"
      }

      return "none"
    }

    return "none"
  }

  return useMemo(() => (
    <div className="round-container">
      <GameEffects />
      <Header openScoreboard={openScoreboard} />
      <div className="chest-and-skulls">
        <Chest chestDragOverGesture={chestDragOverGesture} chestRef={chestRef} />
        <SkullIsland />
      </div>
      <DiceOnGoing
        rolledAreaDragOverGesture={rolledAreaDragOverGesture}
        rolledAreaRef={rolledAreaRef}
      />
      <Footer onRoundOver={onRoundOver} rolledAreaDomNode={rolledAreaRef.current} />
      <DiceContainer
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
          const rolledAreaDomNode = rolledAreaRef.current
          const rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode)
          if (
            rectangleCollidesWithRectangle(
              dragDiceGesture.diceRectangle,
              rolledAreaDomNodeRectangle,
            )
          ) {
            rolledAreaDragOverGestureSetter({
              dice,
              allowed: canKeepDice(dice),
            })
          } else {
            rolledAreaDragOverGestureSetter(null)
          }

          const chestDomNode = chestRef.current
          const chestDomNodeRectangle = getDomNodeRectangle(chestDomNode)
          if (
            rectangleCollidesWithRectangle(dragDiceGesture.diceRectangle, chestDomNodeRectangle)
          ) {
            chestDragOverGestureSetter({
              dice,
              allowed: canKeepDice(dice),
            })
          } else {
            chestDragOverGestureSetter(null)
          }
        }}
        onDiceDrop={(dice, dropDiceGesture) => {
          const dropIntent = getDropIntent(dice)

          if (dropIntent === "keep") {
            if (canKeepDice(dice)) {
              const chestSlot = moveDiceIntoChest(dice, dropDiceGesture.rectangle)
              setDiceChestSlot(dice, chestSlot)
              keepDice(dice, chestSlot)
            } else {
              // todo: animation pour repositionner le dé dans rolled area
            }
          } else if (dropIntent === "unkeep") {
            if (canUnkeepDice(dice)) {
              moveDiceIntoRolledArea(dice, dropDiceGesture.rectangle)
              unkeepDice(dice)
            } else {
              // todo: animation pour replacer le dé a sa position pre drag
            }
          } else if (dropIntent === "reposition-in-rolled-area") {
            moveDiceIntoRolledArea(dice, dropDiceGesture.rectangle)
          } else if (dropIntent === "reposition-in-chest") {
            const chestSlot = moveDiceIntoChest(dice, dropDiceGesture.rectangle)
            setDiceChestSlot(dice, chestSlot)
          } else {
            // todo: animation pour replacer le dé a sa position pre drag
          }
        }}
      />
    </div>
  ))
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
