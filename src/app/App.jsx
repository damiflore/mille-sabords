import React from "react"

import { useGameCreated } from "root/src/app/main.store.js"
import { useMainDomNodeSetter } from "root/src/app/dom/dom.main.js"
import { Home } from "root/src/app/home/Home.jsx"
import { Game } from "root/src/app/game/Game.jsx"
import { Stylesheet } from "root/src/app/generic/Stylesheet.jsx"
import { Settings } from "root/src/app/settings/settings.component.js"

const appCssUrl = new URL("./app.css", import.meta.url)

export const App = (props) => {
  return (
    <div id="main" ref={useMainDomNodeSetter()}>
      <Stylesheet href={appCssUrl} />
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
