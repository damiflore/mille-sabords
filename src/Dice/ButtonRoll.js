import React from "react"
import { useGameStore, onGoingRef } from "src/MilleSabordGame.js"
import { splitSkulls } from "src/Dice/DiceHelpers.js"
import { rollDices } from "src/Dice/rollDices.js"
import { useRollDicePermission } from "src/game.selectors.js"

export const ButtonRoll = () => {
  const store = useGameStore()
  const rollDicePermission = useRollDicePermission()

  if (rollDicePermission.allowed) {
    return (
      <button
        onClick={() => {
          roll(store)
        }}
      >
        Roll!
      </button>
    )
  }

  if (rollDicePermission.reaon === "3 skulls or more") {
    return null
  }

  return (
    <>
      <button disabled={true}>Roll!</button>
      <span>{`(${rollDicePermission.reason})`}</span>
    </>
  )
}

const roll = ({
  rollIndex,
  diceOffGame,
  diceInGame,
  setDiceInGame,
  setDiceOffGame,
  setRollIndex,
  diceCursed,
  setDiceCursed,
}) => {
  let currentDiceArray
  if (rollIndex === -1) {
    setRollIndex(0)
    currentDiceArray = diceOffGame
    setDiceInGame([...diceOffGame])
    setDiceOffGame([])
  } else {
    currentDiceArray = diceInGame
    setRollIndex(rollIndex + 1)
  }

  rollDices(currentDiceArray, {
    diceParentElement: onGoingRef.current.querySelector(".area"),
  })

  // curse dices
  const { withoutSkulls, skulls } = splitSkulls(currentDiceArray)
  setDiceInGame(withoutSkulls)
  setDiceCursed([...diceCursed, ...skulls])
}
