/* eslint-disable import/max-dependencies */
import React from "react"

import { DiceSet } from "./Dice/DiceSet.js"
import { ButtonRoll } from "./Dice/ButtonRoll.js"
import { CurrentRoundScore } from "./Score/CurrentRoundScore.jsx"
import { TotalScore } from "./Score/TotalScore.jsx"
import { CardArea } from "./Cards/CardArea.js"
import { ButtonRestart } from "./ButtonRestart.js"
import { getMixedDeck } from "./Cards/CardsHelpers.js"
import { computeScore, isGameOver } from "./Score/ScoreHelpers.js"
import { DICE_ARRAY, rollOnGoingDices, diceArrayToSymbolArray } from "/src/Dice/DiceHelpers.js"
import { SYMBOL_SKULL } from "/src/symbols/symbol-types.js"
import { CARD_WITCH } from "src/Cards/card-types.js"

export const MilleSabordGameBoard = () => {
  const [diceOnGoing, setDiceOngoing] = React.useState(DICE_ARRAY)
  const [diceKept, setDiceKept] = React.useState([])

  const [totalScore, setTotalScore] = React.useState(0)

  const [cardDeck, setCardDeck] = React.useState(getMixedDeck())
  const [currentCard, setCurrentCard] = React.useState({})

  const [diceRolledOnce, setDiceRolledOnce] = React.useState(false)
  const [roundFinished, setRoundFinished] = React.useState(false)
  const [cardDrawn, setCardDrawn] = React.useState(false)

  const clearDiceSet = () => {
    setDiceOngoing([...diceOnGoing, ...diceKept])
    setDiceKept([])
    setDiceRolledOnce(false)
    setRoundFinished(false)
  }

  const rollTheDice = () => {
    rollOnGoingDices(diceOnGoing)
    if (!diceRolledOnce) setDiceRolledOnce(true)

    autoKeepSkulls()

    if (isGameOver([...diceOnGoing, ...diceKept], currentCard)) {
      setRoundFinished(true)
      setCardDrawn(false)
    }
  }

  const autoKeepSkulls = () => {
    const diceOnGoingWithoutSkulls = []
    const diceKeptWithSkulls = [...diceKept]

    diceOnGoing.forEach((dice) => {
      if (dice.symbol === SYMBOL_SKULL) {
        diceKeptWithSkulls.push(dice)
      } else {
        diceOnGoingWithoutSkulls.push(dice)
      }
    })

    setDiceOngoing(diceOnGoingWithoutSkulls)
    setDiceKept(diceKeptWithSkulls)
  }

  const keepDice = (dice) => {
    const diceOnGoingWithoutDice = diceOnGoing.filter((diceCandidate) => diceCandidate !== dice)
    setDiceOngoing(diceOnGoingWithoutDice)

    const diceKeptWithDice = [...diceKept, dice]
    setDiceKept(diceKeptWithDice)

    if (currentCard.type === CARD_WITCH && dice === SYMBOL_SKULL) currentCard.effectUsed = false
  }

  const unkeepDice = (dice) => {
    const diceKeptWithoutDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
    setDiceKept(diceKeptWithoutDice)

    const diceOnGoingWithDice = [...diceOnGoing, dice]
    setDiceOngoing(diceOnGoingWithDice)

    if (currentCard.type === CARD_WITCH && dice === SYMBOL_SKULL) currentCard.effectUsed = true
  }

  const markScore = () => {
    setTotalScore(
      totalScore +
        computeScore({ currentCard, symbolArrayFromDiceKept: diceArrayToSymbolArray(diceKept) }),
    )
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

  const canRemoveSkull = currentCard.type === CARD_WITCH && !currentCard.effectUsed

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
          diceRolledOnce={diceRolledOnce}
          cardDrawn={cardDrawn}
          diceOnGoing={diceOnGoing}
          onClick={rollTheDice}
        />
        <ButtonRestart roundFinished={roundFinished} clearDiceSet={clearDiceSet} />
      </div>
      <DiceSet
        title="Dice ongoing"
        diceArray={diceOnGoing}
        actionText="Keep"
        actionFunction={(dice) => keepDice(dice)}
        displayActionCondition={() => {
          if (!diceRolledOnce) return false
          if (roundFinished) return false
          return true
        }}
      />
      <DiceSet
        title="Dice kept"
        diceArray={diceKept}
        actionText="Remove"
        actionFunction={(dice) => unkeepDice(dice)}
        displayActionCondition={(dice) => {
          if (roundFinished) return false
          if (dice.symbol === SYMBOL_SKULL) return canRemoveSkull
          return true
        }}
      />
      <CurrentRoundScore
        diceRolledOnce={diceRolledOnce}
        roundFinished={roundFinished}
        diceKept={diceKept}
        currentCard={currentCard}
        markScore={markScore}
      />
      <TotalScore totalScore={totalScore} />
    </>
  )
}
