import React from "react"
import { Dice } from "./Dice.jsx"
import { isWitchCard } from "src/Cards/cards.js"
import { SYMBOL_SKULL } from "src/symbols/symbol-types.js"
import { useGameStore } from "src/MilleSabordGame.js"

// eslint-disable-next-line react/display-name
export const DiceOnGoing = React.forwardRef((props, ref) => {
  const store = useGameStore()
  const { diceInGame, keepDiceAllowed } = store

  return (
    <div className="diceOnGoing" ref={ref}>
      <div className="area">
        {diceInGame.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            disabled={!keepDiceAllowed}
            onClickAction={(dice) => {
              keepDice(store, dice)
            }}
            specificStyle={{
              left: `${dice.x}px`,
              top: `${dice.y}px`,
              transform: `rotate(${dice.rotation}deg)`,
              position: "absolute",
            }}
          />
        ))}
      </div>
    </div>
  )
})

const keepDice = (
  {
    card,
    diceInGame,
    setCardEffectUsed,
    diceCursed,
    setDiceCursed,
    diceKept,
    setDiceKept,
    setDiceInGame,
  },
  dice,
) => {
  if (dice.symbol === SYMBOL_SKULL) {
    if (isWitchCard(card)) {
      setCardEffectUsed(false)
    }
    const cursedArrayWithThisDice = [...diceCursed, dice]
    setDiceCursed(cursedArrayWithThisDice)
  } else {
    const diceKeptWithDice = [...diceKept, dice]
    setDiceKept(diceKeptWithDice)
  }

  const diceOnGoingWithoutDice = diceInGame.filter((diceCandidate) => diceCandidate !== dice)
  setDiceInGame(diceOnGoingWithoutDice)
}
