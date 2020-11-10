import React from "react"

import { useCurrentCardId, useCurrentCardActivated } from "src/main.store.js"
import { Image } from "src/generic/Image.jsx"
import { useCurrentPlayer } from "src/round/round.selectors.js"
import { cardDefaultUrl, cardIdToCard } from "src/cards/cards.js"
import { CardRulesDialog } from "src/header/CardRulesDialog.jsx"
import { SmallCard } from "src/cards/SmallCard.jsx"
import { SwordChallengeIndicator } from "./SwordChallengeIndicator.jsx"

import { useAnimateTransitionUsingJs } from "src/animation/useAnimateTransition.js"

export const Header = ({ openScoreboard, headerSmallCardRef }) => {
  const [dialogIsOpen, dialogIsOpenSetter] = React.useState(false)
  const currentCard = cardIdToCard(useCurrentCardId())
  const currentCardActivated = useCurrentCardActivated()

  const openDialog = () => {
    if (currentCard) dialogIsOpenSetter(true)
  }

  const closeDialog = () => {
    dialogIsOpenSetter(false)
  }

  return (
    <div className="header">
      <div
        className="card-container"
        onClick={() => {
          openDialog()
        }}
      >
        <div className="small-card">
          <TopDeckCard headerSmallCardRef={headerSmallCardRef} />
        </div>
        {currentCardActivated && <SwordChallengeIndicator />}
      </div>
      <CurrentPlayer openScoreboard={openScoreboard} />
      <TotalScore />
      {currentCard ? (
        <CardRulesDialog card={currentCard} dialogIsOpen={dialogIsOpen} closeDialog={closeDialog} />
      ) : null}
    </div>
  )
}

const TopDeckCard = ({ headerSmallCardRef }) => {
  const currentCard = cardIdToCard(useCurrentCardId())

  if (!currentCard) {
    return <BackCard />
  }

  return <SmallCard card={currentCard} ref={headerSmallCardRef} />
}

const BackCard = () => {
  return (
    <div
      className="card default-card"
      style={{
        backgroundImage: `url(${cardDefaultUrl})`,
        backgroundSize: "217px",
      }}
    ></div>
  )
}

const CurrentPlayer = ({ openScoreboard }) => {
  const player = useCurrentPlayer()

  return (
    <Image
      onClick={openScoreboard}
      className="avatar"
      src={player && player.character.img}
      alt="player"
      style={{
        borderColor: (player && player.character.color) || "white",
      }}
    />
  )
}

const TotalScore = () => {
  const player = useCurrentPlayer()
  const totalScore = player.score
  const totalScoreAnimation = useAnimateTransitionUsingJs(totalScore, {
    duration: 1200,
    timingFunction: (progress) => 1 - Math.pow(1 - progress, 5),
  })

  return (
    <div className="total-score">
      <span
        className="score"
        style={{
          backgroundColor: (player && player.character.color) || "white",
        }}
      >
        {totalScoreAnimation ? totalScoreAnimation.value : totalScore}
      </span>
    </div>
  )
}
