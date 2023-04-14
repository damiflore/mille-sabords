import React from "react"

import { useGameCreated } from "/app/main.store.js"
import { useMainDomNodeSetter } from "/app/dom/dom.main.jsx"
import { Home } from "/app/home/Home.jsx"
import { Game } from "/app/game/Game.jsx"
import { Settings } from "/app/settings/settings.component.jsx"

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
