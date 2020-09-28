import React from "react"

import { GameEffects } from "src/round/round.effects.js"
import { DiceOnGoing } from "src/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "src/chest/Chest.jsx"
import { Header } from "src/header/Header.jsx"
import { Footer } from "src/footer/Footer.jsx"
import { SkullIsland } from "src/skull-island/SkullIsland.jsx"
import { useCurrentPlayerGettingReady } from "src/main.store.js"

const { useMemo } = React

export const Round = ({ openScoreboard, onRoundOver }) => {
  /*
  https://github.com/facebook/react/issues/15156#issuecomment-474590693

  useMemo usage below means the components won't be re-rendered when game global state changes
  and it's fine because as you can see component structure is not conditioned by the gameState or anything.
  Every descendant will still be re-rendered by react and if some component are expensive to render
  they can be wrapped by useMemo with the same pattern.
  (Don't forget to pass dependencies as second arg if there is any).

  There is no real need for useMemo here: it's kept as an example.
  */

  const currentPlayerGettingReady = useCurrentPlayerGettingReady()
  const cardDrawn = !currentPlayerGettingReady

  return useMemo(() => (
    <div className="round-container">
      <GameEffects />
      <Header openScoreboard={openScoreboard} />
      {cardDrawn && (
        <>
          <div className="chest-and-skulls">
            <Chest />
            <SkullIsland />
          </div>
          <DiceOnGoing />
          <Footer onRoundOver={onRoundOver} />
        </>
      )}
    </div>
  ))
}
