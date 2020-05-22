/* eslint-disable import/max-dependencies */
import React from "react"

import { DiceOnGoing } from "./Dice/DiceOnGoing.jsx"
import { ButtonRoll } from "./Dice/ButtonRoll.js"
import { DiceKept } from "./Dice/DiceKept.jsx"
import { Header } from "./Header/Header.jsx"
import { SkullIsland } from "./SkullIsland/SkullIsland.jsx"
// import { CardArea } from "./Cards/CardArea.js"
// import { Shaker } from "./Shaker/Shaker.jsx"
import { getMixedDeck } from "./Cards/cards.js"
import { useStructuredStateWithSessionStorage } from "src/useStructuredState.js"
import { getDiceArray } from "./Dice/DiceHelpers.js"
import { GameLogic } from "./GameLogic.js"

const { createContext, useContext, createRef } = React

const GameStateContext = createContext(null)

const dices = getDiceArray()
const defaultState = {
  totalScore: 0,
  scoreMarked: false,
  isOnSkullIsland: false,
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
  const gameState = useStructuredStateWithSessionStorage(
    {
      ...defaultState,
      ...initialState,
    },
    "game",
  )

  return (
    <GameStateContext.Provider value={gameState}>
      <GameLogic />
      <Header />
      {/* <CardArea /> */}
      <div className="dice-kept-and-skulls">
        <DiceKept />
        <SkullIsland />
      </div>
      <DiceOnGoing ref={onGoingRef} />
      <div className="roll-action">
        <ButtonRoll />
      </div>
    </GameStateContext.Provider>
  )
}

export const useGameState = () => useContext(GameStateContext)
