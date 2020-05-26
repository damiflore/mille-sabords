/* eslint-disable import/max-dependencies */
import React from "react"

import { GameContextProvider } from "src/game.store.js"
import { GameEffects } from "src/game.effects.js"

import { DiceOnGoing } from "./Dice/DiceOnGoing.jsx"
import { DiceKept } from "./Dice/DiceKept.jsx"
import { Header } from "./Header/Header.jsx"
import { Footer } from "./Footer/Footer.jsx"
import { SkullIsland } from "./SkullIsland/SkullIsland.jsx"

const { createRef, useMemo } = React

export const diceRolledAreaElementRef = createRef()

export const Game = ({ gameState }) => {
  return (
    <GameContextProvider initialState={gameState}>
      {useMemo(() => (
        <>
          <GameEffects />
          <Header />
          <div className="dice-kept-and-skulls">
            <DiceKept />
            <SkullIsland />
          </div>
          <DiceOnGoing ref={diceRolledAreaElementRef} />
          <Footer />
        </>
      ))}
    </GameContextProvider>
  )
}
