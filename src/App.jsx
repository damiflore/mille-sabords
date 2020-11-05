import React from "react"
import { useGameCreated } from "src/main.store.js"
import { useMainDomNodeSetter } from "src/dom/dom.main.js"
import { Home } from "src/home/Home.jsx"
import { Game } from "src/game/Game.jsx"
import { Stylesheet } from "src/generic/Stylesheet.jsx"

import milleSabordsCssUrl from "../mille-sabord.css"

export const App = (props) => {
  return (
    <div id="main-container">
      <div id="main" ref={useMainDomNodeSetter()}>
        <Stylesheet href={milleSabordsCssUrl} />
        <AppBody {...props} />
      </div>
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
