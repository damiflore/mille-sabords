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
import { getMixedDeck } from "./Cards/cards.js"
import { useStore } from "src/useStore.js"
import { getDiceArray } from "./Dice/DiceHelpers.js"
import { GameLogic } from "./GameLogic.js"

const { createContext, useContext, createRef } = React

const GameStoreContext = createContext(null)

const dices = getDiceArray()
const defaultState = {
  totalScore: 0,
  roundScore: 0,
  scoreMarked: false,
  isOnSkullIsland: false,
  rollDicePermission: {},
  keepDiceAllowed: false,
  unkeepDiceAllowed: false,
  markScorePermission: {},
  nextRoundPermission: {},
  canRemoveSkull: false,
  cardDeck: getMixedDeck(),
  cardsUsed: [],
  card: null,
  cardEffectUsed: false,
  cardDrawn: false,
  rollIndex: -1,
  dices,
  diceOffGame: dices,
  diceInGame: [],
  diceCursed: [],
  diceKept: [],
}

export const onGoingRef = createRef()

export const MilleSabordGame = ({ initialState } = {}) => {
  const store = useStore({
    ...defaultState,
    ...initialState,
  })

  return (
    <GameStoreContext.Provider value={store}>
      <GameLogic />
      <CardArea />
      <div className="score-area">
        <TotalScore />
        <ButtonNextRound />
        <RoundScore />
      </div>
      <div>
        <DiceKept />
        <SkullIsland />
      </div>
      <div className="roll-action">
        <ButtonRoll />
      </div>
      {/* <Shaker diceOffGame={diceOffGame} /> */}
      <DiceOnGoing ref={onGoingRef} />
    </GameStoreContext.Provider>
  )
}

export const useGameStore = () => useContext(GameStoreContext)
