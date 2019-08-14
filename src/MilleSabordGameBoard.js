import React from "react"

import { DiceSet } from "./DiceSet"
import { rollDice, removeFromArray } from "./helpers/DiceHelpers.js"
import {
  computeScore,
  removeSkullsFromArray,
  countSymbolsOccurences,
  isGameOver,
} from "./helpers/ScoreHelpers"

export const MilleSabordGameBoard = () => {
  const [diceRolled, setDiceRolled] = React.useState([])
  const [diceKept, setDiceKept] = React.useState([])
  const [totalScore, setTotalScore] = React.useState(0)

  const [roundStarted, setRoundStarted] = React.useState(false)
  const [roundFinished, setRoundFinished] = React.useState(false)

  const clearDiceSet = () => {
    setDiceRolled([])
    setDiceKept([])
    setRoundStarted(false)
    setRoundFinished(false)
  }

  const rollTheDice = () => {
    const numberOfDice = diceRolled.length
    const roll = rollDice(numberOfDice > 0 ? numberOfDice : 8)

    // if the roll contain some skulls, remove them from the current roll, add them to the kept dice
    const numberOfSkulls = countSymbolsOccurences(roll).skull
    if (numberOfSkulls) {
      for (var i = 0; i < numberOfSkulls; i++) diceKept.push("skull")
      // note : here it's important to set a copy of the array in order for the view to be updated.
      setDiceKept([...diceKept])
      const rollDiceWithoutSkulls = removeSkullsFromArray(roll)
      setDiceRolled([...rollDiceWithoutSkulls])
    } else {
      setDiceRolled(roll)
    }
    if (!roundStarted) setRoundStarted(true)
    if (isGameOver(diceKept)) setRoundFinished(true)
  }

  const keepOneDice = (dice) => {
    const newArray = removeFromArray(diceRolled, dice)
    setDiceRolled([...newArray])
    const keptArray = diceKept
    keptArray.push(dice)
    setDiceKept([...keptArray])
  }

  const removeOneDice = (dice) => {
    const newArray = removeFromArray(diceKept, dice)
    setDiceKept([...newArray])
    const rollArray = diceRolled
    rollArray.push(dice)
    setDiceRolled([...rollArray])
  }

  const markScore = () => {
    setTotalScore(totalScore + computeScore(diceKept))
    setRoundFinished(true)
  }

  const cannotRollDice = roundStarted && diceRolled.length < 2

  return (
    <>
      {!roundFinished && (
        <div>
          <button onClick={() => rollTheDice()} disabled={cannotRollDice}>
            Roll!
          </button>
          {cannotRollDice && <span> (You must roll at least 2 dice)</span>}
        </div>
      )}
      {roundFinished && (
        <div>
          <button onClick={() => clearDiceSet()}>Restart</button>
        </div>
      )}
      <DiceSet
        title="Roll dice:"
        diceArray={diceRolled}
        actionText="Keep"
        actionFunction={(dice) => keepOneDice(dice)}
        displayActionCondition={() => !roundFinished}
      />
      <DiceSet
        title="Dice kept:"
        diceArray={diceKept}
        actionText="Remove"
        actionFunction={(dice) => removeOneDice(dice)}
        displayActionCondition={(dice) => !roundFinished && dice !== "skull"}
      />
      {diceKept.length > 0 && (
        <div>
          <span className="subtitle"> Current round score: </span>
          <span>{computeScore(diceKept)}</span>
          {!roundFinished && (
            <button onClick={() => markScore()} style={{ marginLeft: "20px" }}>
              Mark this score
            </button>
          )}
        </div>
      )}
      <span className="subtitle"> Total score: </span>
      <span>{totalScore}</span>
    </>
  )
}
