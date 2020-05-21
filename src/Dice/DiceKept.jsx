import React from "react"
import { Dice } from "./Dice.jsx"
import { useGameStore } from "src/MilleSabordGame.js"
import { isWitchCard } from "src/Cards/cards.js"
import { SYMBOL_SKULL } from "src/symbols/symbol-types.js"
import { useKeepDiceAllowed } from "src/game.selectors.js"

export const DiceKept = () => {
  const store = useGameStore()
  const { diceKept } = store
  const unkeepDiceAllowed = useKeepDiceAllowed()

  return (
    <div className="diceKept">
      <div className="area">
        <div className="box">
          {diceKept.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              disabled={!unkeepDiceAllowed}
              onClickAction={(dice) => {
                unkeepDice(store, dice)
              }}
              specificStyle={{ margin: "5px" }}
            />
          ))}
        </div>
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
      </div>
    </div>
  )
}

const unkeepDice = (
  {
    card,
    diceKept,
    setCardEffectUsed,
    diceCursed,
    setDiceCursed,
    setDiceKept,
    diceInGame,
    setDiceInGame,
  },
  dice,
) => {
  if (dice.symbol === SYMBOL_SKULL) {
    if (isWitchCard(card)) {
      setCardEffectUsed(true)
    }
    const cursedArrayWithoutThisDice = diceCursed.filter((diceCandidate) => diceCandidate !== dice)
    setDiceCursed(cursedArrayWithoutThisDice)
  } else {
    const keptArrayWithoutThisDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
    setDiceKept(keptArrayWithoutThisDice)
  }

  const onGoingArrayWithThisDice = [...diceInGame, dice]
  setDiceInGame(onGoingArrayWithThisDice)
}
