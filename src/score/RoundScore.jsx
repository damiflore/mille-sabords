import React from "react"

import { useCurrentCard } from "src/game.store.js"
import { useRoundScore } from "src/game.selectors.js"
import { isPirateCard } from "src/cards/cards.js"

export const RoundScore = () => {
  const currentCard = useCurrentCard()

  return <div className="score-area">{currentCard ? <ScoreDisplay /> : null}</div>
}

const ScoreDisplay = () => {
  const roundScore = useRoundScore()
  const currentCard = useCurrentCard()

  // const { isOnSkullIsland } = state
  // if (isOnSkullIsland) {
  //   return <span>Skull Island!</span>
  // }

  return (
    <>
      <div className="bonds"></div>
      {isPirateCard(currentCard) ? <DoubleScoreIndicator /> : null}
      <div className="round-score">{roundScore}</div>
    </>
  )
}

const DoubleScoreIndicator = () => {
  return <div className="pirate-hook"></div>
}
