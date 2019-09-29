/* eslint-disable import/max-dependencies */
import React from "react"

import { DiceOnGoing } from "./Dice/DiceOnGoing.jsx"
import { ButtonRoll } from "./Dice/ButtonRoll.js"
import { DiceKept } from "./Dice/DiceKept.jsx"
import { RoundScore } from "./Score/RoundScore.jsx"
import { TotalScore } from "./Score/TotalScore.jsx"
import { CardArea } from "./Cards/CardArea.js"
import { SkullIsland } from "./SkullIsland/SkullIsland.jsx"
// import { Shaker } from "./Shaker/Shaker.jsx"
import { ButtonNextRound } from "./ButtonNextRound.js"
import { getMixedDeck } from "./Cards/getMixedDeck.js"
import { rollDices, splitSkulls } from "src/Dice/DiceHelpers.js"
import { SYMBOL_SKULL } from "src/symbols/symbol-types.js"
import { CARD_WITCH, CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"
import { computeIsOnSkullIsland } from "src/SkullIsland/computeIsOnSkullIsland.js"
import { computeRollDicePermission } from "src/Dice/computeRollDicePermission.js"
import { computeMarkScorePermission } from "./Score/computeMarkScorePermission.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"
import { countSkulls } from "src/Dice/countSkulls.js"

export const MilleSabordGameBoard = ({ diceArray }) => {
  const [diceOffGame, setDiceOffGame] = React.useState(diceArray)
  const [diceOnGoing, setDiceOngoing] = React.useState([])
  const [diceKept, setDiceKept] = React.useState([])
  const [diceCursed, setDiceCursed] = React.useState([])

  const [totalScore, setTotalScore] = React.useState(0)

  const [cardDeck, setCardDeck] = React.useState(getMixedDeck())
  const [card, setCard] = React.useState({})

  const [rollIndex, setRollIndex] = React.useState(-1)
  const [cardDrawn, setCardDrawn] = React.useState(false)
  const [scoreMarked, setScoreMarked] = React.useState(false)

  const [isOnSkullIsland, setIsOnSkullIsland] = React.useState(false)
  const [roundScore, setRoundScore] = React.useState(false)

  const [rollDicePermission, setRollDicePermission] = React.useState({})
  const [keepDiceAllowed, setKeepDiceAllowed] = React.useState(false)
  const [unkeepDiceAllowed, setUnkeepDiceAllowed] = React.useState(false)
  const [markScorePermission, setMarkScorePermission] = React.useState({})
  const [nextRoundPermission, setNextRoundPermission] = React.useState({})
  const [canRemoveSkull, setCanRemoveSkull] = React.useState(false)

  // keepDiceAllowed, unkeepDiceAllowed
  React.useEffect(() => {
    const skullCount = countSkulls({ card, diceCursed })
    if (skullCount > 2 || scoreMarked) {
      setKeepDiceAllowed(false)
      setUnkeepDiceAllowed(false)
    } else {
      setKeepDiceAllowed(true)
      setUnkeepDiceAllowed(true)
    }
  }, [card, diceCursed, scoreMarked])

  // isOnSkullIsland
  React.useEffect(() => {
    setIsOnSkullIsland(
      computeIsOnSkullIsland({
        isOnSkullIsland,
        card,
        rollIndex,
        diceCursed,
      }),
    )
  }, [card, rollIndex, diceCursed])

  // rollDicePermission
  React.useEffect(() => {
    setRollDicePermission(
      computeRollDicePermission({
        cardDrawn,
        scoreMarked,
        card,
        diceCursed,
      }),
    )
  }, [cardDrawn, scoreMarked, card, diceCursed])

  // markScorePermission
  React.useEffect(() => {
    setMarkScorePermission(
      computeMarkScorePermission({
        rollIndex,
        card,
        diceCursed,
        scoreMarked,
      }),
    )
  }, [card, rollIndex, diceCursed, scoreMarked])

  // roundScore
  React.useEffect(() => {
    setRoundScore(
      computeRoundScore({
        card,
        diceKept,
        markScoreAllowed: markScorePermission.allowed,
      }),
    )
  }, [card, diceKept, markScorePermission])

  // nextRoundPermission
  React.useEffect(() => {
    if (rollIndex === -1) {
      setNextRoundPermission({ allowed: false })
    } else if (!rollDicePermission.allowed && !markScorePermission.allowed) {
      setNextRoundPermission({ allowed: true })
    }
  }, [rollIndex, rollDicePermission, markScorePermission])

  // canRemoveSkull
  React.useEffect(() => {
    if (card.type === CARD_WITCH) {
      if (diceCursed.length > 2) {
        setCanRemoveSkull(false)
      } else if (card.effectUsed) {
        setCanRemoveSkull(false)
      } else {
        setCanRemoveSkull(true)
      }
    } else {
      setCanRemoveSkull(false)
    }
  }, [card, diceCursed])

  // auto mark score for failed sword challenges
  const markScorePermissionPreviousValue = usePrevious(markScorePermission)
  React.useEffect(() => {
    if (
      card.type === CARD_SWORD_CHALLENGE &&
      !scoreMarked &&
      markScorePermissionPreviousValue.allowed &&
      !markScorePermission.allowed
    ) {
      markScore()
    }
  }, [card, scoreMarked, markScorePermissionPreviousValue, markScorePermission])

  const nextRound = () => {
    setDiceOffGame(diceArray)
    setDiceOngoing([])
    setDiceKept([])
    setDiceCursed([])
    setRollIndex(-1)
    setScoreMarked(false)
    setCardDrawn(false)
    setIsOnSkullIsland(false)
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

  return (
    <>
      <CardArea cardDeck={cardDeck} cardDrawn={cardDrawn} drawCard={drawCard} card={card} />
      <div>
        <ButtonRoll rollDicePermission={rollDicePermission} onClick={rollTheDice} />
        <ButtonNextRound nextRoundPermission={nextRoundPermission} nextRound={nextRound} />
      </div>
      {/* <Shaker diceOffGame={diceOffGame} /> */}
      <DiceOnGoing diceArray={diceOnGoing} keepDiceAllowed={keepDiceAllowed} keepDice={keepDice} />
      <DiceKept
        diceArray={diceKept}
        unkeepDiceAllowed={unkeepDiceAllowed}
        unkeepDice={unkeepDice}
      />
      <SkullIsland
        diceCursed={diceCursed}
        canRemoveSkull={canRemoveSkull}
        removeSkull={(dice) => unkeepDice(dice)}
      ></SkullIsland>
      <RoundScore
        rollIndex={rollIndex}
        isOnSkullIsland={isOnSkullIsland}
        roundScore={roundScore}
        markScorePermission={markScorePermission}
        markScore={markScore}
      />
      <TotalScore totalScore={totalScore} />
    </>
  )
}

const usePrevious = (value) => {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
