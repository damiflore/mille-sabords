/* eslint-disable import/max-dependencies */
import React from "react"

import { DiceSet } from "./Dice/DiceSet.js"
import { ButtonRoll } from "./Dice/ButtonRoll.js"
import { CurrentRoundScore } from "./Score/CurrentRoundScore.jsx"
import { TotalScore } from "./Score/TotalScore.jsx"
import { CardArea } from "./Cards/CardArea.js"
import { CursedIsland } from "./CursedIsland/CursedIsland.jsx"
// import { Shaker } from "./Shaker/Shaker.jsx"
import { ButtonRestart } from "./ButtonRestart.js"
import { getMixedDeck } from "./Cards/CardsHelpers.js"
import { computeRoundState } from "./Score/ScoreHelpers.js"
import {
  DICE_ARRAY,
  rollDices,
  diceArrayToSymbolArray,
  splitSkulls,
} from "/src/Dice/DiceHelpers.js"
import { SYMBOL_SKULL } from "/src/symbols/symbol-types.js"
import { CARD_WITCH, CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"

export const MilleSabordGameBoard = () => {
  const [diceOffGame, setDiceOffGame] = React.useState(DICE_ARRAY)
  const [diceOnGoing, setDiceOngoing] = React.useState([])
  const [diceKept, setDiceKept] = React.useState([])
  const [diceCursed, setDiceCursed] = React.useState([])

  const [totalScore, setTotalScore] = React.useState(0)

  const [cardDeck, setCardDeck] = React.useState(getMixedDeck())
  const [currentCard, setCurrentCard] = React.useState({})

  const [diceRolledOnce, setDiceRolledOnce] = React.useState(false)
  const [currentRoundIndex, setCurrentRoundIndex] = React.useState(0)
  const [cardDrawn, setCardDrawn] = React.useState(false)
  const [scoreMarked, setScoreMarked] = React.useState(false)

  const clearDiceSet = () => {
    setDiceOffGame(DICE_ARRAY)
    setDiceOngoing([])
    setDiceKept([])
    setDiceCursed([])
    setDiceRolledOnce(false)
    setCurrentRoundIndex(0)
    setScoreMarked(false)
    setCardDrawn(false)
  }

  const rollTheDice = () => {
    let currentDiceArray

    if (diceRolledOnce) {
      currentDiceArray = diceOnGoing
      rollDices(diceOnGoing)
    } else {
      currentDiceArray = diceOffGame
      rollDices(diceOffGame)
      setDiceRolledOnce(true)
      setDiceOngoing([...diceOffGame])
      setDiceOffGame([])
    }
    setCurrentRoundIndex(currentRoundIndex + 1)
    checkCursedDices(currentDiceArray)

    // check round state to know if round is over
    const roundState = computeRoundState({
      currentCard,
      symbolArrayFromDiceKept: diceArrayToSymbolArray([...diceOnGoing, ...diceKept]),
      currentRoundIndex,
      scoreMarked,
    })
    if (roundState.isRoundOver) {
      if (currentCard.type === CARD_SWORD_CHALLENGE) markScore()
      setCardDrawn(false)
    }
  }

  const checkCursedDices = (currentDiceArray) => {
    const { withoutSkulls, skulls } = splitSkulls(currentDiceArray)
    setDiceOngoing(withoutSkulls)
    setDiceCursed([...diceCursed, ...skulls])
  }

  const keepDice = (dice) => {
    if (dice.symbol === SYMBOL_SKULL) {
      if (currentCard.type === CARD_WITCH) {
        currentCard.effectUsed = false
      }
      const cursedArrayWithThisDice = [...diceCursed, dice]
      setDiceCursed(cursedArrayWithThisDice)
    } else {
      const diceKeptWithDice = [...diceKept, dice]
      setDiceKept(diceKeptWithDice)
    }

    const diceOnGoingWithoutDice = diceOnGoing.filter((diceCandidate) => diceCandidate !== dice)
    setDiceOngoing(diceOnGoingWithoutDice)
  }

  const unkeepDice = (dice) => {
    if (dice.symbol === SYMBOL_SKULL) {
      if (currentCard.type === CARD_WITCH) {
        currentCard.effectUsed = true
      }
      const cursedArrayWithoutThisDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
      setDiceCursed(cursedArrayWithoutThisDice)
    } else {
      const keptArrayWithoutThisDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
      setDiceKept(keptArrayWithoutThisDice)
    }

    const onGoingArrayWithThisDice = [...diceOnGoing, dice]
    setDiceOngoing(onGoingArrayWithThisDice)
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
      {/* <Shaker diceOffGame={diceOffGame} /> */}
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
        displayActionCondition={() => {
          if (roundState.isRoundOver) return false
          return true
        }}
      />
      <CursedIsland
        diceCursed={diceCursed}
        canRemoveSkull={canRemoveSkull}
        removeSkull={(dice) => unkeepDice(dice)}
      ></CursedIsland>
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
