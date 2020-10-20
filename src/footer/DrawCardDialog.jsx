import React from "react"

import { useCurrentCardId } from "src/main.store.js"
import { useCardDeck } from "src/round/round.selectors.js"
import { useDrawCard, useShuffleDeck } from "src/cards/cards.actions.js"
import { useStartRound } from "src/round/round.actions.js"

import { cardsRules } from "src/cards/cards-rules.js"
import { Dialog } from "src/dialog/Dialog.jsx"
import { cardIdToCard, cardToImageUrl, cardDefaultUrl } from "src/cards/cards.js"
import { SmallCard } from "src/header/Header.jsx"

export const DrawCardDialog = ({ dialogIsOpen, closeDialog }) => {
  const cardDeck = useCardDeck()
  const currentCardId = useCurrentCardId()
  const currentCard = cardIdToCard(currentCardId) || null

  const shuffleCardsText = "Paquet de cartes épuisé. Mélangez-le pour pouvoir piocher à nouveau !"
  const drawCardText = "Piochez une carte pour le tour suivant."

  return (
    <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={false}>
      <div className="dialog-content draw-card-dialog">
        <div className="dialog-body">
          <div className="dialog-label">
            {cardDeck.length === 0 && !currentCard && shuffleCardsText}
            {cardDeck.length !== 0 && !currentCard && drawCardText}
            {currentCard && <span className="card-name">{cardsRules[currentCard.type].name}</span>}
          </div>
          <div className="card-area">
            <BackCard currentCard={currentCard} remainingCardCount={cardDeck.length} />
            <TopCard currentCard={currentCard} />
          </div>
        </div>
        <div className="dialog-actions">
          <DeckButton cardDeck={cardDeck} currentCard={currentCard} />
          <StartButton currentCard={currentCard} closeDialog={closeDialog} />
        </div>
      </div>
    </Dialog>
  )
}

const TopCard = ({ currentCard }) => {
  if (!currentCard) {
    return null
  }

  return (
    <>
      <div className="card current-card" id="big-card">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div
                className="card default-card"
                style={{ backgroundImage: `url(${cardDefaultUrl})` }}
              ></div>
            </div>
            <div className="flip-card-back">
              <img className="card-img" src={cardToImageUrl(currentCard)} alt={currentCard.type} />
            </div>
          </div>
        </div>
      </div>
      <div className="small-card">
        <SmallCard card={currentCard} />
      </div>
    </>
  )
}

const BackCard = ({ currentCard, remainingCardCount }) => {
  return (
    <div
      className="card default-card"
      id="back-deck-card"
      style={{ backgroundImage: `url(${cardDefaultUrl})` }}
    >
      {!currentCard && <div className="remaining-cards-number">{remainingCardCount}</div>}
    </div>
  )
}

const DeckButton = ({ cardDeck, currentCard }) => {
  if (currentCard) {
    return null
  }

  if (cardDeck.length === 0) {
    return <ButtonShuffleDeck />
  }

  return <ButtonDrawCard />
}

const ButtonDrawCard = () => {
  const drawCard = useDrawCard()

  return (
    <button className="draw-card-btn" onClick={drawCard}>
      Piocher
    </button>
  )
}

const ButtonShuffleDeck = () => {
  const shuffleDeck = useShuffleDeck()

  const shuffleDeckAnimation = () => {
    document.getElementById("back-deck-card").setAttribute("shaking-deck", "")
    setTimeout(() => {
      document.getElementById("back-deck-card").removeAttribute("shaking-deck", "")
      shuffleDeck()
    }, 1000)
  }
  return (
    <button className="draw-card-btn" onClick={shuffleDeckAnimation}>
      Mélanger
    </button>
  )
}

const animateCard = (duration) => {
  const bigCard = document.querySelector("#big-card")
  const bigCardBack = document.querySelector("#back-deck-card")
  const smallCard = document.querySelector("#small-card")

  bigCardBack.style.opacity = 0
  bigCard.animate(
    [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(0)", opacity: 0 },
    ],
    {
      duration,
      fill: "forwards",
    },
  )

  smallCard.animate(
    [
      { transform: "scale(0)", opacity: 0, position: "fixed", top: "auto", left: "auto" },
      { transform: "scale(1)", opacity: 1, position: "fixed", top: "15px", left: "15px" },
    ],
    {
      duration,
      fill: "forwards",
    },
  )
}

const StartButton = ({ closeDialog }) => {
  const startRound = useStartRound()

  const start = () => {
    const animationDuration = 500
    animateCard(animationDuration)
    setTimeout(() => {
      startRound()
      closeDialog()
    }, animationDuration)
  }

  return (
    <button
      className="draw-card-btn"
      onClick={() => {
        start()
      }}
    >
      Commencer
    </button>
  )
}
