import React from "react"

import {
  useRoundStarted,
  useGameStarted,
  useCurrentCardId,
  useCurrentCardActivated,
} from "/app/main.store.js"
import { useSignal } from "/app/helper/signal.js"
import { ContextProvider } from "/app/main.context.jsx"
// import { createSkullFromDice } from "/app/test/test.material.js"
import { Stylesheet } from "/app/generic/Stylesheet.jsx"
import { Main } from "/app/main.component.jsx"
import { ScoreBoardLab } from "/lab/ScoreBoardLab.jsx"
import { CardDrawingLab } from "/lab/CardDrawingLab.jsx"
import { CardActivationLab } from "/lab/CardActivationLab.jsx"
import { GameBoardLab } from "/lab/GameBoardLab.jsx"

const labCssUrl = new URL("./lab.css", import.meta.url)

export const Lab = () => {
  const [labOpened, labOpenedSetter] = React.useState(
    JSON.parse(localStorage.getItem("lab-menu-opened")) || false,
  )
  React.useEffect(() => {
    localStorage.setItem("lab-menu-opened", labOpened)
  }, [labOpened])
  const openLab = React.useCallback(() => labOpenedSetter(true))
  const closeLab = React.useCallback(() => labOpenedSetter(false))

  const [playerAnimationListener, playerAnimationEmitter] = useSignal()

  return (
    <div id="lab">
      <Stylesheet href={labCssUrl} />
      <ContextProvider>
        <Main playerAnimationListener={playerAnimationListener} />
        {labOpened ? (
          <GameLab
            closeLab={closeLab}
            playerAnimationEmitter={playerAnimationEmitter}
          />
        ) : (
          <ButtonOpenLab onClick={openLab} />
        )}
      </ContextProvider>
    </div>
  )
}

const GameLab = ({ closeLab, ...props }) => {
  return (
    <aside>
      <ButtonCloseLab onClick={closeLab} />
      <GameLabBody {...props} />
    </aside>
  )
}

const GameLabBody = (props) => {
  const gameStarted = useGameStarted()
  const roundStarted = useRoundStarted()
  const currentCardId = useCurrentCardId()
  const currentCardActivated = useCurrentCardActivated()

  if (!gameStarted) {
    return `Waiting for a game to start`
  }

  if (!roundStarted) {
    return <ScoreBoardLab {...props} />
  }

  if (!currentCardId) {
    return <CardDrawingLab {...props} />
  }

  if (!currentCardActivated) {
    return <CardActivationLab {...props} />
  }

  return <GameBoardLab {...props} />
}

const ButtonOpenLab = ({ onClick }) => {
  return (
    <button className="button-open-lab" onClick={onClick}>
      <svg viewBox="0 -53 384 384">
        <path
          fill="currentColor"
          d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        />
        <path
          fill="currentColor"
          d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        />
        <path
          fill="currentColor"
          d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"
        />
      </svg>
    </button>
  )
}

const ButtonCloseLab = ({ onClick }) => {
  return (
    <button className="button-close-lab" onClick={onClick}>
      <svg viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M10.586 12L3.515 4.929a1 1 0 011.414-1.414L12 10.585l7.071-7.07a1 1 0 011.414 1.414L13.415 12l7.07 7.071a1 1 0 01-1.414 1.414L12 13.415l-7.071 7.07a1 1 0 01-1.414-1.414L10.585 12z"
        ></path>
      </svg>
    </button>
  )
}
