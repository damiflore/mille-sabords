import React from "react"

import { useCurrentCard, useCardDeck } from "src/main.store.js"
import { useDrawCard, useShuffleDeck } from "src/cards/cards.actions.js"
import { useStartRound } from "src/round/round.actions.js"

import { cardsRules } from "src/cards/cards-rules.js"
import { Dialog } from "src/dialog/Dialog.jsx"
import { SmallCard } from "src/header/Header.jsx"

export const DrawCardDialog = ({ dialogIsOpen, closeDialog }) => {
  const cardDeck = useCardDeck()
  const card = useCurrentCard()

  const shuffleCardsText = "Paquet de cartes épuisé. Mélangez-le pour pouvoir piocher à nouveau !"
  const drawCardText = "Piochez une carte pour le tour suivant."

  return (
    <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={false}>
      <div className="dialog-content draw-card-dialog">
        <div className="dialog-body">
          <div className="dialog-label">
            {cardDeck.length === 0 && !card && shuffleCardsText}
            {cardDeck.length !== 0 && !card && drawCardText}
            {card && <span className="card-name">{cardsRules[card].name}</span>}
          </div>
          <div className="card-area">
            <BackCard />
            <TopCard />
          </div>
        </div>
        <div className="dialog-actions">
          <DeckButton />
          <StartButton closeDialog={closeDialog} />
        </div>
      </div>
    </Dialog>
  )
}

const TopCard = () => {
  const card = useCurrentCard()

  if (card)
    return (
      <>
        <div className="card current-card" id="big-card">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div
                  className="card default-card"
                  style={{ backgroundImage: "url('/src/cards/card_default.png')" }}
                ></div>
              </div>
              <div className="flip-card-back">
                <img className="card-img" src={`/src/cards/card_${card}.png`} alt={card} />
              </div>
            </div>
          </div>
        </div>
        <div className="small-card">
          <SmallCard card={card} />
        </div>
      </>
    )
  return null
}

const BackCard = () => {
  const cardDeck = useCardDeck()
  const currentCard = useCurrentCard()

  return (
    <div
      className="card default-card"
      id="back-deck-card"
      style={{ backgroundImage: "url('/src/cards/card_default.png')" }}
    >
      {!currentCard && <div className="remaining-cards-number">{cardDeck.length}</div>}
    </div>
  )
}

const DeckButton = () => {
  const currentCard = useCurrentCard()
  const cardDeck = useCardDeck()

  if (currentCard) return null

  if (cardDeck.length === 0) return <ShuffleDeckButton />

  return <DrawCardButton />
}

const DrawCardButton = () => {
  const drawCard = useDrawCard()

  return (
    <button className="draw-card-btn" onClick={drawCard}>
      Piocher
    </button>
  )
}

const ShuffleDeckButton = () => {
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
  const currentCard = useCurrentCard()
  const startRound = useStartRound()

  const start = () => {
    const animationDuration = 500
    animateCard(animationDuration)
    setTimeout(() => {
      startRound()
      closeDialog()
    }, animationDuration)
  }

  if (currentCard) {
    return (
      <button className="draw-card-btn" onClick={start}>
        Commencer
      </button>
    )
  }
  return null
}
