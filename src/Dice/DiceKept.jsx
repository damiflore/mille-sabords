import React from "react"
import { Dice } from "./Dice.jsx"

export const DiceKept = ({ diceArray, unkeepDiceAllowed, unkeepDice }) => (
  <div className="diceKept">
    <div className="area">
      <div className="box">
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
      <div className="top-left-corner"></div>
      <div className="top-right-corner"></div>
      <div className="bottom-left-corner"></div>
      <div className="bottom-right-corner"></div>
    </div>
  </div>
)
