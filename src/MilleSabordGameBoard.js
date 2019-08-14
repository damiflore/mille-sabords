import React from "react"

import { DiceSet } from "./DiceSet"
import { rollDice, removeFromArray } from "./helpers/DiceHelpers.js"
import { getMixedDeck, getCardName } from "./helpers/CardsHelpers"
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

  const [cardDeck, setCardDeck] = React.useState(getMixedDeck())
  const [currentCard, setCurrentCard] = React.useState("")

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
    if (isGameOver(diceKept, currentCard)) setRoundFinished(true)
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
    setTotalScore(totalScore + computeScore(diceKept, currentCard))
    setRoundFinished(true)
  }

  const drawCard = () => {
    if (cardDeck.length > 0) {
      setCurrentCard(cardDeck.pop())
      setCardDeck(cardDeck)
    } else {
      setCardDeck(getMixedDeck())
    }
  }

  const cannotRollDice = roundStarted && diceRolled.length < 2

  return (
    <>
      <div>
        {!roundFinished && (
          <>
            <button onClick={() => rollTheDice()} disabled={cannotRollDice}>
              Roll!
            </button>
            {cannotRollDice && <span> (You must roll at least 2 dice)</span>}
          </>
        )}
        {roundFinished && <button onClick={() => clearDiceSet()}>Restart</button>}
      </div>
      <DiceSet
        title="Roll dice"
        diceArray={diceRolled}
        actionText="Keep"
        actionFunction={(dice) => keepOneDice(dice)}
        displayActionCondition={() => !roundFinished}
      />
      <DiceSet
        title="Dice kept"
        diceArray={diceKept}
        actionText="Remove"
        actionFunction={(dice) => removeOneDice(dice)}
        displayActionCondition={(dice) => !roundFinished && dice !== "skull"}
      />
      {diceKept.length > 0 && (
        <div>
          <span className="subtitle"> Current round score: </span>
          <span>{computeScore(diceKept, currentCard)}</span>
          {!roundFinished && (
            <button onClick={() => markScore()} style={{ marginLeft: "20px" }}>
              Mark this score
            </button>
          )}
        </div>
      )}
      <div>
        <span className="subtitle"> Total score: </span>
        <span className="totalScore">{totalScore}</span>
      </div>

      <div>
        <button onClick={() => drawCard()} style={{ marginTop: "20px" }}>
          {cardDeck.length > 0 ? "Draw a card" : "Shuffle the deck"}
        </button>
        <div style={{ marginTop: "10px" }}>Remaining cards: {cardDeck.length}</div>
        <span className="card">{getCardName(currentCard)}</span>
      </div>
    </>
  )
}
