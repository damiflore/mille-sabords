/* eslint-disable import/max-dependencies */
import React from "react"

import {
  useDices,
  useDiceRolledIds,
  useDiceCursedIds,
  useChestSlots,
  createAction,
} from "src/main.store.js"
import { useDiceDomNode } from "src/dom/dom.main.js"
import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
} from "src/symbols/symbols.js"
import { faces } from "src/dices/dices.js"
import { useResetRound } from "src/round/round.actions.js"
import { useUncurseDice } from "src/dices/dices.actions.js"

export const GameBoardLab = () => {
  const dices = useDices()
  const resetRound = useResetRound()

  return (
    <>
      <form
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault()
        }}
      >
        <fieldset>
          <legend>Dices</legend>
          {Object.keys(dices).map((diceId) => {
            return <DiceVariants key={diceId} dice={dices[diceId]} />
          })}
        </fieldset>
      </form>
      <button
        onClick={() => {
          resetRound()
        }}
      >
        Reset round
      </button>
    </>
  )
}

const VARIANTS = [
  "random",
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
]

const DiceVariants = ({ dice }) => {
  const diceDomNode = useDiceDomNode(dice.id)
  const diceRolledIds = useDiceRolledIds()
  const diceCursedIds = useDiceCursedIds()
  const chestSlots = useChestSlots()
  const uncurseDice = useUncurseDice()

  const isCursed = diceCursedIds.includes(dice.id)

  return (
    <div className="dice-variants">
      {VARIANTS.map((variant) => {
        return <DiceVariant key={variant} variant={variant} dice={dice} />
      })}
      Location: {diceToAreaName(dice, { diceRolledIds, diceCursedIds, chestSlots })}
      <button
        disabled={!diceDomNode}
        onClick={() => {
          const outline = diceDomNode.style.outline
          diceDomNode.style.outline = "5px solid red"
          setTimeout(() => {
            diceDomNode.style.outline = outline
          }, 1000)
        }}
      >
        inspect
      </button>
      <button
        disabled={!isCursed}
        onClick={() => {
          if (isCursed) {
            uncurseDice(dice, true)
          }
        }}
      >
        {isCursed ? "uncurse" : "not cursed"}
      </button>
    </div>
  )
}

const diceToAreaName = (dice, { diceRolledIds, diceCursedIds, chestSlots }) => {
  if (diceRolledIds.includes(dice.id)) {
    return "roll-area"
  }

  if (diceCursedIds.includes(dice.id)) {
    return "cursed-area"
  }
  const chestSlot = Object.keys(chestSlots).find(
    (chestSlot) =>
      chestSlots[chestSlot] &&
      chestSlots[chestSlot].type === "dice" &&
      chestSlots[chestSlot].value === dice.id,
  )
  if (chestSlot) {
    return `chest-slot#${chestSlot}`
  }

  return "offscreen"
}

const DiceVariant = ({ dice, variant }) => {
  const cheatDice = useCheatDice()
  const uncheatDice = useUncheatDice()
  const isCurrent = diceIsCheated(dice) ? dice.faces[0] === variant : variant === "random"

  return (
    <button
      className="dice-variant"
      data-active={isCurrent ? "" : undefined}
      // should also be disabled if the dice is in kept area (but we don't iterate over thoose)
      disabled={isCurrent}
      onClick={() => {
        if (variant === "random") {
          uncheatDice(dice)
        } else {
          cheatDice(dice, variant)
        }
      }}
    >
      {variant === "random" ? (
        "?"
      ) : (
        <img width="32" height="32" src={`src/dices/dice_${variant}.png`} />
      )}
    </button>
  )
}

const diceIsCheated = (dice) => dice.faces[0] === dice.faces[1]

const useCheatDice = createAction((state, dice, symbol) => {
  dice.faces = dice.faces.map(() => symbol)
  // force re-render of rolled, cursed and kept area
  // (in theory we could optimize to render depening where the dice is)
  const { dices, diceRolledIds, diceCursedIds, chestSlots } = state
  return {
    ...state,
    dices: { ...dices },
    diceRolledIds: [...diceRolledIds],
    diceCursedIds: [...diceCursedIds],
    chestSlots: { ...chestSlots },
  }
})

const useUncheatDice = createAction((state, dice) => {
  dice.faces = faces
  // force re-render of rolled, cursed and kept area
  // (in theory we could optimize to render depening where the dice is)
  const { dices, diceRolledIds, diceCursedIds, chestSlots } = state
  return {
    ...state,
    dices: { ...dices },
    diceRolledIds: [...diceRolledIds],
    diceCursedIds: [...diceCursedIds],
    chestSlots: { ...chestSlots },
  }
})
