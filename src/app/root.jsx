import React from "react"

import { useGameCreated } from "/src/app/main.store.js"
import { useMainDomNodeSetter } from "/src/app/dom/dom.main.jsx"
import { Home } from "/src/app/home/Home.jsx"
import { Game } from "/src/app/game/Game.jsx"
import { Settings } from "/src/app/settings/settings.component.jsx"

export const App = (props) => {
  return (
    <div id="main" ref={useMainDomNodeSetter()}>
      <Settings />
      <AppBody {...props} />
    </div>
  )
}

const AppBody = (props) => {
  const gameCreated = useGameCreated()

  if (gameCreated) {
    return <Game {...props} />
  }

  return <Home {...props} />
}
