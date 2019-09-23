/* eslint-disable import/max-dependencies */
import React from "react"

import { DiceSet } from "./Dice/DiceSet.js"
import { ButtonRoll } from "./Dice/ButtonRoll.js"
import { CurrentRoundScore } from "./Score/CurrentRoundScore.jsx"
import { TotalScore } from "./Score/TotalScore.jsx"
import { CardArea } from "./Cards/CardArea.js"
import { SkullIsland } from "./SkullIsland/SkullIsland.jsx"
// import { Shaker } from "./Shaker/Shaker.jsx"
import { ButtonRestart } from "./ButtonRestart.js"
import { getMixedDeck } from "./Cards/CardsHelpers.js"
import { computeRoundState } from "./Score/ScoreHelpers.js"
import { DICE_ARRAY, rollDices, splitSkulls } from "/src/Dice/DiceHelpers.js"
import { SYMBOL_SKULL } from "/src/symbols/symbol-types.js"
import { CARD_WITCH, CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"
import { canGoOnSkullIsland } from "/src/SkullIsland/canGoOnSkullIsland.js"
import { isSentToSkullIsland } from "/src/SkullIsland/isSentToSkullIsland.js"

export const MilleSabordGameBoard = () => {
  const [diceOffGame, setDiceOffGame] = React.useState(DICE_ARRAY)
  const [diceOnGoing, setDiceOngoing] = React.useState([])
  const [diceKept, setDiceKept] = React.useState([])
  const [diceCursed, setDiceCursed] = React.useState([])

  const [totalScore, setTotalScore] = React.useState(1000)

  const [cardDeck, setCardDeck] = React.useState(getMixedDeck())
  const [card, setCard] = React.useState({})

  const [rollIndex, setRollIndex] = React.useState(-1)
  const [cardDrawn, setCardDrawn] = React.useState(false)
  const [scoreMarked, setScoreMarked] = React.useState(false)

  const [isOnSkullIsland, setIsOnSkullIsland] = React.useState(false)
  const [hasThreeSkullsOrMore, setHasThreeSkullsOrMore] = React.useState(false)
  const [isRoundOver, setIsRoundOver] = React.useState(false)
  const [roundScore, setRoundScore] = React.useState(false)

  React.useEffect(() => {
    if (canGoOnSkullIsland({ card, rollIndex }) && isSentToSkullIsland({ card, diceCursed })) {
      setIsOnSkullIsland(true)
    }
  }, [card, rollIndex])

  // compute some variables when
  // - dice are rolled
  // - or a dice is kept
  // - or a dice is unkept
  // - or score is marked (because it influences isRoundOver)
  React.useEffect(() => {
    const { hasThreeSkullsOrMore, isRoundOver, score } = computeRoundState({
      card,
      diceKept,
      diceCursed,
      scoreMarked,
    })
    setRoundScore(score)
    setHasThreeSkullsOrMore(hasThreeSkullsOrMore)
    setIsRoundOver(isRoundOver)
  }, [card, diceKept, diceCursed, scoreMarked])

  // auto mark score when round is over with sword challenge
  React.useEffect(() => {
    if (card.type === CARD_SWORD_CHALLENGE && isRoundOver) markScore()
  }, [isRoundOver, card])

  // auto set card drawn to false when round is over
  React.useEffect(() => {
    if (isRoundOver) {
      setCardDrawn(false)
    }
  }, [isRoundOver])

  const clearDiceSet = () => {
    setDiceOffGame(DICE_ARRAY)
    setDiceOngoing([])
    setDiceKept([])
    setDiceCursed([])
    setRollIndex(-1)
    setScoreMarked(false)
    setCardDrawn(false)
    setIsOnSkullIsland(false)
    setHasThreeSkullsOrMore(false)
    setIsRoundOver(false)
    setRoundScore(0)
  }

  const rollTheDice = () => {
    let currentDiceArray

    if (rollIndex === -1) {
      currentDiceArray = diceOffGame
      rollDices(diceOffGame)
      setDiceOngoing([...diceOffGame])
      setDiceOffGame([])
      setRollIndex(0)
    } else {
      currentDiceArray = diceOnGoing
      rollDices(diceOnGoing)
      setRollIndex(rollIndex + 1)
    }
    curseDices(currentDiceArray)
  }

  const curseDices = (currentDiceArray) => {
    const { withoutSkulls, skulls } = splitSkulls(currentDiceArray)
    setDiceOngoing(withoutSkulls)
    setDiceCursed([...diceCursed, ...skulls])
  }

  const keepDice = (dice) => {
    if (dice.symbol === SYMBOL_SKULL) {
      if (card.type === CARD_WITCH) {
        card.effectUsed = false
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
      if (card.type === CARD_WITCH) {
        card.effectUsed = true
      }
      const cursedArrayWithoutThisDice = diceCursed.filter(
        (diceCandidate) => diceCandidate !== dice,
      )
      setDiceCursed(cursedArrayWithoutThisDice)
    } else {
      const keptArrayWithoutThisDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
      setDiceKept(keptArrayWithoutThisDice)
    }

    const onGoingArrayWithThisDice = [...diceOnGoing, dice]
    setDiceOngoing(onGoingArrayWithThisDice)
  }

  const markScore = () => {
    setTotalScore(Math.max(totalScore + roundScore, 0))
    setCardDrawn(false)
    setScoreMarked(true)
  }

  const drawCard = () => {
    if (cardDeck.length > 0) {
      setCard(cardDeck.pop())
      setCardDeck(cardDeck)
      setCardDrawn(true)
    } else {
      setCardDeck(getMixedDeck())
    }
  }

  const canRemoveSkull = card.type === CARD_WITCH && !card.effectUsed && !isRoundOver

  return (
    <>
      <CardArea cardDeck={cardDeck} cardDrawn={cardDrawn} drawCard={drawCard} card={card} />
      <div>
        <ButtonRoll
          rollIndex={rollIndex}
          cardDrawn={cardDrawn}
          diceOnGoing={diceOnGoing}
          onClick={rollTheDice}
          isRoundOver={isRoundOver}
        />
        <ButtonRestart
          clearDiceSet={clearDiceSet}
          isRoundOver={isRoundOver}
          rollIndex={rollIndex}
        />
      </div>
      {/* <Shaker diceOffGame={diceOffGame} /> */}
      <DiceSet
        title="Dice ongoing"
        diceArray={diceOnGoing}
        actionText="Keep"
        actionFunction={(dice) => keepDice(dice)}
        displayActionCondition={() => {
          if (rollIndex === -1) return false
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
      <SkullIsland
        diceCursed={diceCursed}
        canRemoveSkull={canRemoveSkull}
        removeSkull={(dice) => unkeepDice(dice)}
      ></SkullIsland>
      <CurrentRoundScore
        rollIndex={rollIndex}
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
