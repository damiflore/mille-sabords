import React from "react"

import { DiceSet } from "./Dice/DiceSet.js"
import { ButtonRoll } from "./Dice/ButtonRoll.js"
import { CurrentRoundScore } from "./Score/CurrentRoundScore.js"
import { TotalScore } from "./Score/TotalScore.js"
import { CardArea } from "./Cards/CardArea.js"
import { ButtonRestart } from "./ButtonRestart.js"

import { rollDice, removeFromArray } from "./Dice/DiceHelpers.js"
import { getMixedDeck } from "./Cards/CardsHelpers.js"
import {
  computeScore,
  removeSkullsFromArray,
  countSymbolsOccurences,
  isGameOver,
} from "./Score/ScoreHelpers"

export const MilleSabordGameBoard = () => {
  const [diceRolled, setDiceRolled] = React.useState([])
  const [diceKept, setDiceKept] = React.useState([])

  const [totalScore, setTotalScore] = React.useState(0)

  const [cardDeck, setCardDeck] = React.useState(getMixedDeck())
  const [currentCard, setCurrentCard] = React.useState({})

  const [roundStarted, setRoundStarted] = React.useState(false)
  const [roundFinished, setRoundFinished] = React.useState(false)
  const [cardDrawn, setCardDrawn] = React.useState(false)

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
    if (isGameOver(diceKept, currentCard)) {
      setRoundFinished(true)
      setCardDrawn(false)
    }
  }

  const keepOneDice = (dice) => {
    const newArray = removeFromArray(diceRolled, dice)
    setDiceRolled([...newArray])
    const keptArray = diceKept
    keptArray.push(dice)
    setDiceKept([...keptArray])
    if (currentCard.type === "witch" && dice === "skull") currentCard.effectUsed = false
  }

  const removeOneDice = (dice) => {
    const newArray = removeFromArray(diceKept, dice)
    setDiceKept([...newArray])
    const rollArray = diceRolled
    rollArray.push(dice)
    setDiceRolled([...rollArray])
    if (currentCard.type === "witch" && dice === "skull") currentCard.effectUsed = true
  }

  const markScore = () => {
    setTotalScore(totalScore + computeScore(currentCard, diceKept))
    setRoundFinished(true)
    setCardDrawn(false)
  }

  const drawCard = () => {
    if (cardDeck.length > 0) {
      setCurrentCard(cardDeck.pop())
      setCardDeck(cardDeck)
      setCardDrawn(true)
    } else {
      setCardDeck(getMixedDeck())
    }
  }

  const canRemoveSkull = currentCard.type === "witch" && !currentCard.effectUsed

  return (
    <>
      <CardArea
        cardDeck={cardDeck}
        cardDrawn={cardDrawn}
        drawCard={drawCard}
        currentCard={currentCard}
      />
      <div>
        <ButtonRoll
          roundFinished={roundFinished}
          roundStarted={roundStarted}
          cardDrawn={cardDrawn}
          diceRolled={diceRolled}
          onClick={rollTheDice}
        />
        <ButtonRestart roundFinished={roundFinished} clearDiceSet={clearDiceSet} />
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
        displayActionCondition={(dice) => !roundFinished && (dice !== "skull" || canRemoveSkull)}
      />
      <CurrentRoundScore
        roundFinished={roundFinished}
        diceKept={diceKept}
        currentCard={currentCard}
        markScore={markScore}
      />
      <TotalScore totalScore={totalScore} />
    </>
  )
}
