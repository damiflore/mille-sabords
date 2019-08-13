import React from "react"

import { rollDice, removeFromArray } from "./helpers/DiceHelpers.js"
import { computeScore, keepSkulls } from "./helpers/ScoreHelpers"
import { setStorageArray, getStorageArray, clearStorageArray } from "./helpers/LocalStorage"

const GameBoard = () => {
  // const [diceResult, setDiceResult] = React.useState([])

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          const numberOfDice = getStorageArray("roll").length
          clearStorageArray("roll")
          setStorageArray("roll", rollDice(numberOfDice > 0 ? numberOfDice : 8))
          keepSkulls()
        }}
      >
        Roll the dice
      </button>

      {getStorageArray("roll").length > 0 && (
        <div>
          <h2> Roll dice: </h2>
          {getStorageArray("roll").map((dice, index) => (
            <div key={index}>
              <button
                style={{
                  marginRight: "20px",
                }}
                type="button"
                onClick={() => {
                  const newArray = removeFromArray(getStorageArray("roll"), dice)
                  setStorageArray("roll", newArray)
                  const keptArray = getStorageArray("diceKept")
                  keptArray.push(dice)
                  setStorageArray("diceKept", keptArray)
                }}
              >
                Keep
              </button>
              {dice}
            </div>
          ))}
        </div>
      )}

      {getStorageArray("diceKept").length > 0 && (
        <div>
          <h2> Dice kept: </h2>
          {getStorageArray("diceKept").map((dice, index) => (
            <div key={index}>
              {dice !== "skull" && (
                <button
                  style={{
                    marginRight: "20px",
                  }}
                  type="button"
                  onClick={() => {
                    const newArray = removeFromArray(getStorageArray("diceKept"), dice)
                    setStorageArray("diceKept", newArray)
                    const rollArray = getStorageArray("roll")
                    rollArray.push(dice)
                    setStorageArray("roll", rollArray)
                  }}
                >
                  Remove
                </button>
              )}
              {dice}
            </div>
          ))}

          <h2> Score: </h2>
          <span>{computeScore(getStorageArray("diceKept"))}</span>
        </div>
      )}
    </div>
  )
}

export default GameBoard

// import React from "react"

// function GameBoard() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = React.useState(0)

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   )
// }

// export default GameBoard
