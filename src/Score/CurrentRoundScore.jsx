import React from "react"

export const CurrentRoundScore = ({
  diceRolledOnce,
  isOnSkullIsland,
  hasThreeSkullsOrMore,
  isRoundOver,
  roundScore,
  markScore,
}) => {
  if (!diceRolledOnce) {
    return null
  }

  return (
    <div>
      <span className="subtitle"> Current round score: </span>
      <ScoreDisplay
        isOnSkullIsland={isOnSkullIsland}
        hasThreeSkullsOrMore={hasThreeSkullsOrMore}
        isRoundOver={isRoundOver}
        roundScore={roundScore}
        markScore={markScore}
      />
    </div>
  )
}

const ScoreDisplay = ({
  isOnSkullIsland,
  hasThreeSkullsOrMore,
  isRoundOver,
  roundScore,
  markScore,
}) => {
  if (isOnSkullIsland) {
    return <span>XXX -Skull Island- XXX</span>
  }

  return (
    <>
      <span>{roundScore}</span>
      {isRoundOver ? null : <MarkScoreButton onClick={markScore} />}
      {hasThreeSkullsOrMore ? <div>Round over!</div> : null}
    </>
  )
}

const MarkScoreButton = ({ onClick }) => (
  <button onClick={onClick} style={{ marginLeft: "20px" }}>
    Mark this score
  </button>
)
