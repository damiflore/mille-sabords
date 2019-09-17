/* eslint-disable import/max-dependencies */
import React from "react"

import { DiceSet } from "./Dice/DiceSet.js"
import { ButtonRoll } from "./Dice/ButtonRoll.js"
import { CurrentRoundScore } from "./Score/CurrentRoundScore.jsx"
import { TotalScore } from "./Score/TotalScore.jsx"
import { CardArea } from "./Cards/CardArea.js"
import { ButtonRestart } from "./ButtonRestart.js"
import { getMixedDeck } from "./Cards/CardsHelpers.js"
import { computeRoundState } from "./Score/ScoreHelpers.js"
import { DICE_ARRAY, rollOnGoingDices, diceArrayToSymbolArray } from "/src/Dice/DiceHelpers.js"
import { SYMBOL_SKULL } from "/src/symbols/symbol-types.js"
import { CARD_WITCH, CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"

export const MilleSabordGameBoard = () => {
  const [diceOnGoing, setDiceOngoing] = React.useState(DICE_ARRAY)
  const [diceKept, setDiceKept] = React.useState([])

  const [totalScore, setTotalScore] = React.useState(0)

  const [cardDeck, setCardDeck] = React.useState(getMixedDeck())
  const [currentCard, setCurrentCard] = React.useState({})

  const [diceRolledOnce, setDiceRolledOnce] = React.useState(false)
  const [currentRoundIndex, setCurrentRoundIndex] = React.useState(0)
  const [cardDrawn, setCardDrawn] = React.useState(false)
  const [scoreMarked, setScoreMarked] = React.useState(false)

  const clearDiceSet = () => {
    setDiceOngoing([...diceOnGoing, ...diceKept])
    setDiceKept([])
    setDiceRolledOnce(false)
    setCurrentRoundIndex(0)
    setScoreMarked(false)
    setCardDrawn(false)
  }

  const rollTheDice = () => {
    rollOnGoingDices(diceOnGoing)
    if (!diceRolledOnce) setDiceRolledOnce(true)
    setCurrentRoundIndex(currentRoundIndex + 1)

    autoKeepSkulls()

    // check round state to know if round is over
    const roundState = computeRoundState({
      currentCard,
      symbolArrayFromDiceKept: diceArrayToSymbolArray([...diceOnGoing, ...diceKept]),
      currentRoundIndex,
      scoreMarked,
    })
    if (roundState.isRoundOver) {
      if (currentCard.type === CARD_SWORD_CHALLENGE) markScore();
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

    if (currentCard.type === CARD_WITCH && dice.symbol === SYMBOL_SKULL)
      currentCard.effectUsed = false
  }

  const unkeepDice = (dice) => {
    const diceKeptWithoutDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
    setDiceKept(diceKeptWithoutDice)

    const diceOnGoingWithDice = [...diceOnGoing, dice]
    setDiceOngoing(diceOnGoingWithDice)

    if (currentCard.type === CARD_WITCH && dice.symbol === SYMBOL_SKULL)
      currentCard.effectUsed = true
  }

  const markScore = () => {
    setTotalScore(
      totalScore +
        computeRoundState({
          currentCard,
          symbolArrayFromDiceKept: diceArrayToSymbolArray(diceKept),
          currentRoundIndex,
          scoreMarked,
        }).score,
    )
    setCardDrawn(false)
    setScoreMarked(true)
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
  const roundState = computeRoundState({
    currentCard,
    symbolArrayFromDiceKept: diceArrayToSymbolArray([...diceOnGoing, ...diceKept]),
    currentRoundIndex,
    scoreMarked,
  })

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
          diceRolledOnce={diceRolledOnce}
          cardDrawn={cardDrawn}
          diceOnGoing={diceOnGoing}
          onClick={rollTheDice}
          roundState={roundState}
        />
        <ButtonRestart
          clearDiceSet={clearDiceSet}
          roundState={roundState}
          diceRolledOnce={diceRolledOnce}
        />
      </div>
      <DiceSet
        title="Dice ongoing"
        diceArray={diceOnGoing}
        actionText="Keep"
        actionFunction={(dice) => keepDice(dice)}
        displayActionCondition={() => {
          if (!diceRolledOnce) return false
          if (roundState.isRoundOver) return false
          return true
        }}
      />
      <DiceSet
        title="Dice kept"
        diceArray={diceKept}
        actionText="Remove"
        actionFunction={(dice) => unkeepDice(dice)}
        displayActionCondition={(dice) => {
          if (roundState.isRoundOver) return false
          if (dice.symbol === SYMBOL_SKULL) return canRemoveSkull
          return true
        }}
      />
      <CurrentRoundScore
        diceRolledOnce={diceRolledOnce}
        diceKept={diceKept}
        currentCard={currentCard}
        markScore={markScore}
        scoreMarked={scoreMarked}
        currentRoundIndex={currentRoundIndex}
      />
      <TotalScore totalScore={totalScore} />
    </>
  )
}
