import React from "react"

import { useCurrentCardId, useCurrentCardActivated } from "/app/main.store.js"
import { Image } from "/app/generic/Image.jsx"
import { useCurrentPlayer } from "/app/round/round.selectors.js"
import { cardDefaultUrl, cardIdToCard } from "/app/cards/cards.js"
import { CardRulesDialog } from "/app/header/CardRulesDialog.jsx"
import { SmallCard } from "/app/cards/SmallCard.jsx"
import { useAnimateTransitionUsingJs } from "/app/animation/useAnimateTransition.js"

import { SwordChallengeIndicator } from "./SwordChallengeIndicator.jsx"

export const Header = ({ openScoreboard, headerSmallCardRef }) => {
  const currentCard = cardIdToCard(useCurrentCardId())
  const currentCardActivated = useCurrentCardActivated()

  return (
    <div className="header">
      <div
        className="card-container"
        style={{ opacity: currentCardActivated ? "1" : "0" }}
      >
        <div className="small-card">
          {currentCard ? (
            <HeaderSmallCard
              headerSmallCardRef={headerSmallCardRef}
              currentCard={currentCard}
            />
          ) : (
            <BackCard />
          )}
        </div>
        {currentCardActivated && <SwordChallengeIndicator />}
      </div>
      <CurrentPlayer openScoreboard={openScoreboard} />
      <TotalScore />
    </div>
  )
}

const HeaderSmallCard = ({ headerSmallCardRef, currentCard }) => {
  const [cardDialogIsOpen, cardDialogIsOpenSetter] = React.useState(false)
  const openCardDialog = () => {
    cardDialogIsOpenSetter(true)
  }

  const closeCardDialog = () => {
    cardDialogIsOpenSetter(false)
  }

  return (
    <>
      <SmallCard
        onClick={() => {
          openCardDialog()
        }}
        card={currentCard}
        ref={headerSmallCardRef}
      />
      <CardRulesDialog
        card={currentCard}
        dialogIsOpen={cardDialogIsOpen}
        closeDialog={closeCardDialog}
      />
    </>
  )
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
      width="55"
      height="55"
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
