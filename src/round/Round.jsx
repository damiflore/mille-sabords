/* eslint-disable import/max-dependencies */
import React from "react"

import { useDices, useChestSlots, useDicesRolled } from "src/main.store.js"
import { GameEffects } from "src/round/round.effects.js"
import { DiceOnGoing } from "src/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "src/chest/Chest.jsx"
import { Header } from "src/header/Header.jsx"
import { Footer } from "src/footer/Footer.jsx"
import { SkullIsland } from "src/skull-island/SkullIsland.jsx"
import { Dice, diceIsInChestGetter, diceIsInRolledAreaGetter } from "src/dices/Dice.jsx"
import {
  useMoveDice,
  useKeepDice,
  useUnkeepDice,
  useSetDiceChestSlot,
} from "src/dices/dices.actions.js"
import {
  rectangleCollidesWithRectangle,
  rectangleInsideOf,
  getDomNodeRectangle,
  findClosestRectangle,
} from "src/helper/rectangle.js"

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
  const dicesRolled = useDicesRolled()
  const [diceDraggedOverRolledArea, diceDraggedOverRolledAreaSetter] = React.useState(null)
  const [diceDraggedOverChest, diceDraggedOverChestSetter] = React.useState(null)
  const rolledAreaRef = React.useRef(null)
  const chestRef = React.useRef(null)

  const moveDice = useMoveDice()
  const keepDice = useKeepDice()
  const unkeepDice = useUnkeepDice()
  const setDiceChestSlot = useSetDiceChestSlot()

  return useMemo(() => (
    <div className="round-container">
      <GameEffects />
      <Header openScoreboard={openScoreboard} />
      <div className="chest-and-skulls">
        <Chest diceDraggedOverChest={diceDraggedOverChest} chestRef={chestRef} />
        <SkullIsland />
      </div>
      <DiceOnGoing
        diceDraggedOverRolledArea={diceDraggedOverRolledArea}
        rolledAreaRef={rolledAreaRef}
      />
      <Footer onRoundOver={onRoundOver} />
      <DiceContainer
        onDiceDrag={(dice, dragDiceGesture) => {
          const rolledAreaDomNode = rolledAreaRef.current
          const rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode)
          if (
            rectangleCollidesWithRectangle(
              dragDiceGesture.diceRectangle,
              rolledAreaDomNodeRectangle,
            )
          ) {
            diceDraggedOverRolledAreaSetter(dice)
          } else {
            diceDraggedOverRolledAreaSetter(null)
          }

          const chestDomNode = chestRef.current
          const chestDomNodeRectangle = getDomNodeRectangle(chestDomNode)
          if (
            rectangleCollidesWithRectangle(dragDiceGesture.diceRectangle, chestDomNodeRectangle)
          ) {
            diceDraggedOverChestSetter(dice)
          } else {
            diceDraggedOverChestSetter(null)
          }
        }}
        onDiceDrop={(dice, dropDiceGesture) => {
          if (diceDraggedOverRolledArea) {
            const rolledAreaDomNode = rolledAreaRef.current
            const rolledAreaDomNodeRectangle = getDomNodeRectangle(rolledAreaDomNode)
            const diceRectangle = rectangleInsideOf(
              dropDiceGesture.diceRectangle,
              rolledAreaDomNodeRectangle,
            )
            moveDice(dice, {
              x: diceRectangle.left,
              y: diceRectangle.top,
            })

            // attention, seulement si c'est authorisé
            const diceIsInChest = diceIsInChestGetter({ diceId: dice.id, chestSlots })
            if (diceIsInChest) {
              unkeepDice(dice)
            }
            return
          }

          if (diceDraggedOverChest) {
            if (threeSkullsOrMoreInCursedArea) {
              // il faudrait renvoyé le dé d'ou il provient
              return
            }

            const chestDomNode = chestRef.current
            const rectangleToChestSlotMap = new Map()
            const rectangleCandidates = []
            Object.keys(chestSlots).forEach((chestSlot) => {
              const chestSlotContent = chestSlots[chestSlot]
              const chestSlotIsEmpty = !chestSlotContent
              if (
                chestSlotIsEmpty ||
                (chestSlotContent.type === "dice" &&
                  chestSlotContent.value === diceDraggedOverChest.id)
              ) {
                const chestSlotDomNode = chestDomNode.querySelector(
                  `[data-chest-slot="${chestSlot}"]`,
                )
                const rectangle = getDomNodeRectangle(chestSlotDomNode)
                rectangleToChestSlotMap.set(rectangle, chestSlot)
                rectangleCandidates.push(rectangle)
              }
            })
            const closestRectangle = findClosestRectangle(
              dropDiceGesture.diceRectangle,
              rectangleCandidates,
            )
            const closestChestSlot = rectangleToChestSlotMap.get(closestRectangle)
            const diceIsInRolledArea = diceIsInRolledAreaGetter(dice, { dicesRolled })

            // on met le dé aux coordonées les plus proches
            moveDice(dice, {
              x: closestRectangle.left,
              y: closestRectangle.top,
            })
            if (diceIsInRolledArea) {
              keepDice(diceDraggedOverChest, closestChestSlot)
            } else {
              setDiceChestSlot(diceDraggedOverChest, closestChestSlot)
            }
          }
        }}
      />
    </div>
  ))
}

const DiceContainer = ({ onDiceDrag, onDiceDrop }) => {
  const dices = useDices()
  return dices.map((dice) => (
    <Dice key={dice.id} dice={dice} onDiceDrag={onDiceDrag} onDiceDrop={onDiceDrop} />
  ))
}
