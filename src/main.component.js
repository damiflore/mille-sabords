import React from "react"
import { useGameCreated } from "src/main.store.js"
import { useMainDomNodeSetter } from "src/dom/dom.main.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { Home } from "src/home/Home.jsx"
import { Game } from "src/game/Game.jsx"
import { catchError } from "src/error/error.main.js"
import { watchBooting } from "src/booting/booting.main.js"
import { PreloadImages } from "src/generic/PreloadImages.jsx"

import milleSabordsCssUrl from "../mille-sabord.css"

const MainRaw = ({ booted, ...props }) => {
  React.useEffect(() => {
    if (booted) {
      window.removeSplashscreen()
    }
  }, [booted])

  return (
    <div id="main-container">
      <div id="main" ref={useMainDomNodeSetter()}>
        <Stylesheet href={milleSabordsCssUrl} />
        <AppBody {...props} />
        {booted ? <PreloadImages /> : null}
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

const ErrorScreen = ({ error }) => {
  window.removeSplashscreen()
  return (
    <div>
      An error occured<pre>{typeof error === "object" ? error.stack : error}</pre>
    </div>
  )
}

export const Main = catchError(watchBooting(MainRaw), ErrorScreen)
