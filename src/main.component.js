import React from "react"
import { useGameStarted } from "src/main.store.js"
import { Home } from "src/home/Home.jsx"
import { Game } from "src/game/Game.jsx"
import { catchError } from "src/error/error.main.js"
import { watchBooting } from "src/booting/booting.main.js"

const MainRaw = () => {
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

export const Main = catchError(
  watchBooting(MainRaw, () => window.removeSplashscreen()),
  ErrorScreen,
)
