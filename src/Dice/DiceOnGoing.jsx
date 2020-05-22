import React from "react"
import { Dice } from "./Dice.jsx"
import { isWitchCard } from "src/Cards/cards.js"
import { SYMBOL_SKULL } from "src/constants.js"
import { useGameState } from "src/MilleSabordGame.js"
import { useKeepDiceAllowed } from "src/game.selectors.js"

// eslint-disable-next-line react/display-name
export const DiceOnGoing = React.forwardRef((props, ref) => {
  const state = useGameState()
  const { diceInGame } = state
  const keepDiceAllowed = useKeepDiceAllowed(state)

  return (
    <div className="dice-ongoing" ref={ref}>
      <div className="map"></div>
      <div className="area">
        {diceInGame.map((dice) => (
          <Dice
            key={dice.id}
            dice={dice}
            disabled={!keepDiceAllowed}
            onClickAction={(dice) => {
              keepDice(state, dice)
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

  const diceInGameWithoutDice = diceInGame.filter((diceCandidate) => diceCandidate !== dice)
  setDiceInGame(diceInGameWithoutDice)
}
