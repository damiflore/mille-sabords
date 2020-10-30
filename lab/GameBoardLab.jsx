/* eslint-disable import/max-dependencies */
import React from "react"

import {
  useDices,
  useDiceRolledIds,
  useDiceCursedIds,
  useChestSlots,
  useDispatch,
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
import { useCurrentPlayer } from "src/round/round.selectors.js"
import { useResetRound } from "src/round/round.actions.js"

export const GameBoardLab = () => {
  const dices = useDices()
  const currentPlayer = useCurrentPlayer()
  const setCurrentPlayerScore = useSetCurrentPlayerScore()
  const resetRound = useResetRound()

  return (
    <>
      <form
        onSubmit={(submitEvent) => {
          submitEvent.preventDefault()
        }}
      >
        <fieldset>
          <legend>Score de {`${currentPlayer.character.name}`}</legend>
          {[0, 3000, 5900].map((score) => {
            return (
              <button
                key={score}
                onClick={() => {
                  setCurrentPlayerScore(score)
                }}
              >
                Set to {score}
              </button>
            )
          })}
        </fieldset>
      </form>
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

const useSetCurrentPlayerScore = () => {
  const dispatch = useDispatch()
  return (score) => {
    dispatch((state) => {
      const { currentPlayerId, players } = state
      const currentPlayer = useCurrentPlayer(currentPlayerId, { players })
      currentPlayer.score = score
      return {
        ...state,
        players: [...players],
      }
    })
  }
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

const diceIsCheated = (dice) => dice.faces[0] === dice.faces[1]

const DiceVariant = ({ dice, variant }) => {
  const isCurrent = diceIsCheated(dice) ? dice.faces[0] === variant : variant === "random"
  const dispatch = useDispatch()

  return (
    <button
      className="dice-variant"
      data-active={isCurrent ? "" : undefined}
      // should also be disabled if the dice is in kept area (but we don't iterate over thoose)
      disabled={isCurrent}
      onClick={() => {
        if (variant === "random") {
          dice.faces = faces
        } else {
          dice.faces = dice.faces.map(() => variant)
        }
        // force re-render of rolled, cursed and kept area
        // (in theory we could optimize to render depening where the dice is)
        dispatch((state) => {
          const { dicesRolled, dicesCursed, chestSlots } = state
          return {
            ...state,
            dicesRolled: [...dicesRolled],
            dicesCursed: [...dicesCursed],
            chestSlots: { ...chestSlots },
          }
        })
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
