import React from "react"
import { useGameCreated } from "src/main.store.js"
import { useMainDomNodeSetter } from "src/dom/dom.main.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { Home } from "src/home/Home.jsx"
import { Game } from "src/game/Game.jsx"
import { catchError } from "src/error/error.main.js"
import { watchLoading } from "src/loading/loading.main.js"
import { ImagePreloader } from "src/loading/ImagePreloader.jsx"

import milleSabordsCssUrl from "../mille-sabord.css"

const MainRaw = ({ booted, ...props }) => {
  React.useEffect(() => {
    if (booted) {
      window.splashscreen.remove()
    }
  }, [booted])

  return (
    <div id="main-container">
      <div id="main" ref={useMainDomNodeSetter()}>
        <Stylesheet href={milleSabordsCssUrl} />
        <AppBody {...props} />
        {booted ? <ImagePreloader /> : null}
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
  window.splashscreen.remove()
  return (
    <div>
      An error occured<pre>{typeof error === "object" ? error.stack : error}</pre>
    </div>
  )
}

export const Main = catchError(watchLoading(MainRaw), ErrorScreen)
