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
import { DICE_ARRAY, rollDices, splitSkulls } from "/src/Dice/DiceHelpers.js"
import { SYMBOL_SKULL } from "/src/symbols/symbol-types.js"
import { CARD_WITCH, CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"

export const MilleSabordGameBoard = () => {
  const [diceOffGame, setDiceOffGame] = React.useState(DICE_ARRAY)
  const [diceOnGoing, setDiceOngoing] = React.useState([])
  const [diceKept, setDiceKept] = React.useState([])
  const [diceCursed, setDiceCursed] = React.useState([])

  const [totalScore, setTotalScore] = React.useState(1000)

  const [cardDeck, setCardDeck] = React.useState(getMixedDeck())
  const [currentCard, setCurrentCard] = React.useState({})

  const [diceRolledOnce, setDiceRolledOnce] = React.useState(false)
  const [currentRoundIndex, setCurrentRoundIndex] = React.useState(-1)
  const [cardDrawn, setCardDrawn] = React.useState(false)
  const [scoreMarked, setScoreMarked] = React.useState(false)

  const [isOnSkullIsland, setIsOnSkullIsland] = React.useState(false)
  const [hasThreeSkullsOrMore, setHasThreeSkullsOrMore] = React.useState(false)
  const [isRoundOver, setIsRoundOver] = React.useState(false)
  const [roundScore, setRoundScore] = React.useState(false)

  const clearDiceSet = () => {
    setDiceOffGame(DICE_ARRAY)
    setDiceOngoing([])
    setDiceKept([])
    setDiceCursed([])
    setDiceRolledOnce(false)
    setCurrentRoundIndex(-1)
    setScoreMarked(false)
    setCardDrawn(false)
    setIsOnSkullIsland(false)
    setHasThreeSkullsOrMore(false)
    setIsRoundOver(false)
    setRoundScore(0)
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
    const currentRoundIndexLastValue = currentRoundIndex + 1
    setCurrentRoundIndex(currentRoundIndexLastValue)

    const diceCursedLastValue = curseDices(currentDiceArray)

    const { isOnSkullIsland, hasThreeSkullsOrMore, isRoundOver, score } = computeRoundState({
      currentCard,
      diceKept,
      diceCursed: diceCursedLastValue,
      currentRoundIndex: currentRoundIndexLastValue,
      scoreMarked,
    })
    setIsOnSkullIsland(isOnSkullIsland)
    setHasThreeSkullsOrMore(hasThreeSkullsOrMore)
    setIsRoundOver(isRoundOver)
    setRoundScore(score)

    if (isRoundOver) {
      if (currentCard.type === CARD_SWORD_CHALLENGE) markScore()
      setCardDrawn(false)
    }
  }

  const curseDices = (currentDiceArray) => {
    const { withoutSkulls, skulls } = splitSkulls(currentDiceArray)
    setDiceOngoing(withoutSkulls)
    const diceCursedLastValue = [...diceCursed, ...skulls]
    setDiceCursed(diceCursedLastValue)
    return diceCursedLastValue
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
    setTotalScore(Math.min(totalScore + roundScore, 0))
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
          isRoundOver={isRoundOver}
        />
        <ButtonRestart
          clearDiceSet={clearDiceSet}
          isRoundOver={isRoundOver}
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
          if (isRoundOver) return false
          return true
        }}
      />
      <DiceSet
        title="Dice kept"
        diceArray={diceKept}
        actionText="Remove"
        actionFunction={(dice) => unkeepDice(dice)}
        displayActionCondition={() => {
          if (isRoundOver) return false
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
        isOnSkullIsland={isOnSkullIsland}
        hasThreeSkullsOrMore={hasThreeSkullsOrMore}
        isRoundOver={isRoundOver}
        roundScore={roundScore}
        markScore={markScore}
      />
      <TotalScore totalScore={totalScore} />
    </>
  )
}
