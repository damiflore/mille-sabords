/* eslint-disable import/max-dependencies */
import React from "react"

import {
  useGameDomNodeSetter,
  useRessourceTracking,
  useAllResourceTracking,
  useRessourceTracker,
} from "src/game.store.js"
import { HeadCSSLink } from "src/generic/HeadCSSLink.jsx"
import { GameEffects } from "src/game.effects.js"
import { PreloadImages } from "src/PreloadImages.jsx"

import { DiceOnGoing } from "src/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "src/chest/Chest.jsx"
import { Header } from "src/header/Header.jsx"
import { Footer } from "src/footer/Footer.jsx"
import { SkullIsland } from "src/skull-island/SkullIsland.jsx"

const { useMemo } = React

export const Game = () => {
  /*
  https://github.com/facebook/react/issues/15156#issuecomment-474590693

  useMemo usage below means the components won't be re-rendered when game global state changes
  and it's fine because as you can see component structure is not conditioned by the gameState or anything.
  Every descendant will still be re-rendered by react and if some component are expensive to render
  they can be wrapped by useMemo with the same pattern.
  (Don't forget to pass dependencies as second arg if there is any).

  There is no real need for useMemo here: it's kept as an example.
  */
  const gameDomNodeSetter = useGameDomNodeSetter()

  return useMemo(() => (
    <div id="game-container">
      <div id="game" ref={gameDomNodeSetter}>
        <HeadCSSLink href="/mille-sabord.css" />
        <GameEffects />
        <PreloadImages />
        <Header />
        <div className="chest-and-skulls">
          <Chest />
          <SkullIsland />
        </div>
        <DiceOnGoing />
        <Footer />
        <GameLoadedWatcher />
      </div>
    </div>
  ))
}

const GameLoadedWatcher = () => {
  // fake the loading of some ressource to ensure
  // other components had time to register their own ressource loaded tracker
  const endLoadingRessource = useRessourceTracker("")
  React.useEffect(() => {
    endLoadingRessource()
  }, [])

  const ressourceTracking = useRessourceTracking("")
  const allRessourceTracking = useAllResourceTracking()
  React.useEffect(() => {
    if (!ressourceTracking) {
      return
    }

    const allLoaded = Object.keys(allRessourceTracking).every(
      (url) => allRessourceTracking[url].status === "loaded",
    )
    // console.log(
    //   "ressource tracked",
    //   Object.keys(allRessourceTracking),
    //   allLoaded,
    //   allRessourceTracking,
    // )
    if (allLoaded) {
      setTimeout(
        () => {
          console.info(`all game ressource loaded`, Object.keys(allRessourceTracking))
          window.removeSplashscreen()
        },
        // give bit of time for the browser to render stuff
        50,
      )
    }
  }, [ressourceTracking, allRessourceTracking])

  return null
}
