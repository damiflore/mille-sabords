import React from "react"

import {
  useRoundStarted,
  useGameStarted,
  useCurrentCardId,
  useCurrentPlayerGettingReady,
} from "src/main.store.js"
import { ContextProvider } from "src/main.context.js"
// import { createSkullFromDice } from "src/test/test.material.js"
import { Stylesheet } from "src/generic/Stylesheet.jsx"
import { Main } from "src/main.component.js"
import { ScoreBoardLab } from "lab/ScoreBoardLab.jsx"
import { DrawCardLab } from "lab/DrawCardLab.jsx"
import { StartRoundLab } from "lab/StartRoundLab.jsx"
import { RoundLab } from "lab/RoundLab.jsx"
import labCssUrl from "lab/lab.css"

export const Lab = () => {
  const [labOpened, labOpenedSetter] = React.useState(
    localStorage.getItem("lab-menu-opened") || false,
  )
  React.useEffect(() => {
    localStorage.setItem("lab-menu-opened", labOpened)
  }, [labOpened])
  const openLab = React.useCallback(() => labOpenedSetter(true))
  const closeLab = React.useCallback(() => labOpenedSetter(false))

  return (
    <div id="lab">
      <Stylesheet href={labCssUrl} />
      <ContextProvider>
        <Main />
        {labOpened ? <GameLab closeLab={closeLab} /> : <ButtonOpenLab onClick={openLab} />}
      </ContextProvider>
    </div>
  )
}

const GameLab = ({ closeLab }) => {
  return (
    <aside>
      <ButtonCloseLab onClick={closeLab} />
      <GameLabBody />
    </aside>
  )
}

const GameLabBody = () => {
  const gameStarted = useGameStarted()
  const roundStarted = useRoundStarted()
  const currentCardId = useCurrentCardId()
  const currentPlayerGettingReady = useCurrentPlayerGettingReady()

  if (!gameStarted) {
    return `Waiting for a game to start`
  }

  if (!roundStarted) {
    if (!currentPlayerGettingReady) {
      return <ScoreBoardLab />
    }
    if (!currentCardId) {
      return <DrawCardLab />
    }
    return <StartRoundLab />
  }

  return <RoundLab />
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
