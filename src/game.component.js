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
      {
        /*
        useMemo usage below means the components won't be re-rendered when game global state changes
        and it's fine because as you can see component structure is not conditioned by the gameState or anything.
        Every descendant will still be re-rendered by react and if some component are expensive to render
        they can be wrapped by useMemo with the same pattern.
        (Don't forget to pass dependencies as second arg if there is any).

        There is no real need for useMemo here: it's kept as an example.
        */
        useMemo(() => (
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
        ))
      }
    </GameContextProvider>
  )
}