import React from "react"
import { useGameStarted } from "src/main.store.js"
import { useMainDomNodeSetter } from "src/dom/dom.main.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { Home } from "src/home/Home.jsx"
import { Game } from "src/game/Game.jsx"
import { catchError } from "src/error/error.main.js"
import { watchBooting } from "src/booting/booting.main.js"
import { PreloadImages } from "src/generic/PreloadImages.jsx"

const MainRaw = ({ booted }) => {
  React.useEffect(() => {
    if (booted) {
      window.removeSplashscreen()
    }
  }, [booted])

  return (
    <div id="main-container">
      <div id="main" ref={useMainDomNodeSetter()}>
        <Stylesheet href="/mille-sabord.css" />
        <AppBody />
        {booted ? <PreloadImages /> : null}
      </div>
    </div>
  )
}

const AppBody = () => {
  const gameStarted = useGameStarted()

  if (gameStarted) {
    return <Game />
  }

  return <Home />
}

const ErrorScreen = ({ error }) => {
  window.removeSplashscreen()
  return (
    <div>
      An error occured<pre>{typeof error === "object" ? error.stack : error}</pre>
    </div>
  )
}

export const Main = catchError(watchBooting(MainRaw), ErrorScreen)
