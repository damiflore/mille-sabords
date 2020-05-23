/* eslint-disable import/max-dependencies */
import React from "react"
import { createLogger } from "@jsenv/logger"
import { gameStore } from "src/game.store.js"
import { DiceOnGoing } from "./Dice/DiceOnGoing.jsx"
import { ButtonRoll } from "./Dice/ButtonRoll.js"
import { DiceKept } from "./Dice/DiceKept.jsx"
import { Header } from "./Header/Header.jsx"
import { SkullIsland } from "./SkullIsland/SkullIsland.jsx"
import { getMixedDeck } from "./Cards/cards.js"
import { getDiceArray } from "./Dice/DiceHelpers.js"
import { GameLogic } from "./GameLogic.js"

const { createRef, useEffect } = React

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

export const MilleSabordGame = ({ initialState, logLevel = "warn" } = {}) => {
  const logger = createLogger({ logLevel })
  const storageKey = "game"
  const initialGameState = {
    ...defaultState,
    ...initialState,
  }
  const [state, dispatch] = gameStore.useReducer(initialGameState, () => {
    if (sessionStorage.hasOwnProperty(storageKey)) {
      const valueFromSessionStorage = JSON.parse(sessionStorage.getItem(storageKey))
      logger.debug(`read sessionStorage ${storageKey} = `, valueFromSessionStorage)
      return valueFromSessionStorage
    }
    logger.debug(`sessionStorage has nothing for ${storageKey}`)
    return initialGameState
  })
  const { DispatchContext, StateContext } = gameStore

  useEffect(() => {
    logger.debug(`write sessionStorage ${storageKey} = `, state)
    sessionStorage.setItem(storageKey, JSON.stringify(state))
  }, [state])

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
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
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
