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
import {
  mixDeck,
  isWitchCard,
  isTwoSwordsChallengeCard,
  isThreeSwordsChallengeCard,
  isFourSwordsChallengeCard,
} from "./Cards/cards.js"
import { rollDices } from "./Dice/rollDices.js"
import { splitSkulls } from "src/Dice/DiceHelpers.js"
import { SYMBOL_SKULL } from "src/symbols/symbol-types.js"
import { computeIsOnSkullIsland } from "src/SkullIsland/computeIsOnSkullIsland.js"
import { computeRollDicePermission } from "src/Dice/computeRollDicePermission.js"
import { computeMarkScorePermission } from "./Score/computeMarkScorePermission.js"
import { computeRoundScore } from "src/Score/computeRoundScore.js"
import { countSkulls } from "src/Dice/countSkulls.js"
import { useGameStore, useGameState, useGameActions } from "./gameStore.js"

export const MilleSabordGameBoard = ({ initialState } = {}) => {
  const { StateContext, state, ActionsContext, actions } = useGameStore(initialState)

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        <MilleSabordGame></MilleSabordGame>
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

const MilleSabordGame = () => {
  const {
    totalScore,
    roundScore,
    scoreMarked,
    isOnSkullIsland,
    rollDicePermission,
    keepDiceAllowed,
    unkeepDiceAllowed,
    markScorePermission,
    nextRoundPermission,
    canRemoveSkull,
    cardDeck,
    cardsUsed,
    cardEffectUsed,
    card,
    cardDrawn,
    rollIndex,
    dices,
    diceOffGame,
    diceInGame,
    diceCursed,
    diceKept,
  } = useGameState()
  const {
    setTotalScore,
    setRoundScore,
    setScoreMarked,
    setIsOnSkullIsland,
    setRollDicePermission,
    setKeepDiceAllowed,
    setUnkeepDiceAllowed,
    setMarkScorePermission,
    setNextRoundPermission,
    setCanRemoveSkull,
    setCardDeck,
    setCardsUsed,
    setCard,
    setCardEffectUsed,
    setCardDrawn,
    setRollIndex,
    setDiceOffGame,
    setDiceInGame,
    setDiceCursed,
    setDiceKept,
  } = useGameActions()

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
    if (isWitchCard(card)) {
      if (diceCursed.length > 2) {
        setCanRemoveSkull(false)
      } else if (cardEffectUsed) {
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
    const isSwordChallengeCard =
      isTwoSwordsChallengeCard(card) ||
      isThreeSwordsChallengeCard(card) ||
      isFourSwordsChallengeCard(card)
    if (
      isSwordChallengeCard &&
      !scoreMarked &&
      markScorePermissionPreviousValue.allowed &&
      !markScorePermission.allowed
    ) {
      markScore()
    }
  }, [card, scoreMarked, markScorePermissionPreviousValue, markScorePermission])

  const onGoingRef = React.createRef()

  const nextRound = () => {
    setDiceOffGame(dices)
    setDiceInGame([])
    setDiceKept([])
    setDiceCursed([])
    setRollIndex(-1)
    setScoreMarked(false)
    setCardDrawn(false)
    setCardEffectUsed(false)
    setIsOnSkullIsland(false)
    setRoundScore(0)
  }

  const rollTheDice = () => {
    let currentDiceArray

    if (rollIndex === -1) {
      currentDiceArray = diceOffGame
      setDiceInGame([...diceOffGame])
      setDiceOffGame([])
      setRollIndex(0)
    } else {
      currentDiceArray = diceInGame
      setRollIndex(rollIndex + 1)
    }

    rollDices(currentDiceArray, {
      diceParentElement: onGoingRef.current.querySelector(".area"),
    })
    curseDices(currentDiceArray)
  }

  const curseDices = (currentDiceArray) => {
    const { withoutSkulls, skulls } = splitSkulls(currentDiceArray)
    setDiceInGame(withoutSkulls)
    setDiceCursed([...diceCursed, ...skulls])
  }

  const keepDice = (dice) => {
    if (dice.symbol === SYMBOL_SKULL) {
      if (isWitchCard(card)) {
        setCardEffectUsed(false)
      }
      const cursedArrayWithThisDice = [...diceCursed, dice]
      setDiceCursed(cursedArrayWithThisDice)
    } else {
      const diceKeptWithDice = [...diceKept, dice]
      setDiceKept(diceKeptWithDice)
    }

    const diceOnGoingWithoutDice = diceInGame.filter((diceCandidate) => diceCandidate !== dice)
    setDiceInGame(diceOnGoingWithoutDice)
  }

  const unkeepDice = (dice) => {
    if (dice.symbol === SYMBOL_SKULL) {
      if (isWitchCard(card)) {
        setCardEffectUsed(true)
      }
      const cursedArrayWithoutThisDice = diceCursed.filter(
        (diceCandidate) => diceCandidate !== dice,
      )
      setDiceCursed(cursedArrayWithoutThisDice)
    } else {
      const keptArrayWithoutThisDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
      setDiceKept(keptArrayWithoutThisDice)
    }

    const onGoingArrayWithThisDice = [...diceInGame, dice]
    setDiceInGame(onGoingArrayWithThisDice)
  }

  const markScore = () => {
    setTotalScore(Math.max(totalScore + roundScore, 0))
    setScoreMarked(true)
  }

  const shuffleDeck = () => {
    const newDeck = cardsUsed.slice()
    mixDeck(newDeck)
    setCardsUsed([])
    setCardDeck(newDeck)
  }

  const drawCard = () => {
    setCardDrawn(true)
    const cardDrawn = cardDeck[0]
    setCardsUsed([...cardsUsed, cardDrawn])
    setCard(cardDeck[0])
    setCardDeck(cardDeck.slice(1))
  }

  return (
    <>
      <CardArea
        cardDeck={cardDeck}
        cardDrawn={cardDrawn}
        drawCard={drawCard}
        shuffleDeck={shuffleDeck}
        card={card}
      />
      <div className="score-area">
        <TotalScore totalScore={totalScore} />
        <ButtonNextRound nextRoundPermission={nextRoundPermission} nextRound={nextRound} />
        <RoundScore
          rollIndex={rollIndex}
          isOnSkullIsland={isOnSkullIsland}
          roundScore={roundScore}
          markScorePermission={markScorePermission}
          markScore={markScore}
        />
      </div>
      <div>
        <DiceKept
          diceArray={diceKept}
          unkeepDiceAllowed={unkeepDiceAllowed}
          unkeepDice={unkeepDice}
        />
        <SkullIsland
          diceCursed={diceCursed}
          canRemoveSkull={canRemoveSkull}
          removeSkull={(dice) => unkeepDice(dice)}
        />
      </div>
      <div className="roll-action">
        <ButtonRoll rollDicePermission={rollDicePermission} onClick={rollTheDice} />
      </div>
      {/* <Shaker diceOffGame={diceOffGame} /> */}
      <DiceOnGoing
        ref={onGoingRef}
        diceArray={diceInGame}
        keepDiceAllowed={keepDiceAllowed}
        keepDice={keepDice}
      />
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
