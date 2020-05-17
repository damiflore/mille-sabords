import React from "react"
import { Dice } from "./Dice.jsx"

export const DiceKept = ({ diceArray, unkeepDiceAllowed, unkeepDice }) => (
  <div className="diceKept">
    <div className="area">
      {diceArray.map((dice) => (
        <Dice
          key={dice.id}
          dice={dice}
          disabled={!unkeepDiceAllowed}
          onClickAction={unkeepDice}
          specificStyle={{ margin: "5px" }}
        />
      ))}
    </div>
  </div>
)
