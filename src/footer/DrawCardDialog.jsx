import React from "react"

import { useCurrentCardId } from "src/main.store.js"
import { Image } from "src/generic/Image.jsx"
import { useCardDeck } from "src/round/round.selectors.js"
import { useDrawCard, useShuffleDeck } from "src/cards/cards.actions.js"
import { useActivateCurrentCard } from "src/round/round.actions.js"

import { cardsRules } from "src/cards/cards-rules.js"
import { Dialog } from "src/dialog/Dialog.jsx"
import { cardIdToCard, cardToImageUrl, cardDefaultUrl } from "src/cards/cards.js"
import { SmallCard } from "src/header/Header.jsx"

export const DrawCardDialog = ({ dialogIsOpen, closeDialog }) => {
  const cardDeck = useCardDeck()
  const currentCardId = useCurrentCardId()
  const currentCard = cardIdToCard(currentCardId) || null

  const backCardRef = React.useRef()

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
            <div
              style={{
                position: "relative",
              }}
            >
              <BackCard
                backCardRef={backCardRef}
                currentCard={currentCard}
                remainingCardCount={cardDeck.length}
              />
              <TopCard currentCard={currentCard} />
            </div>
          </div>
        </div>
        <div className="dialog-actions">
          <DeckButton backCardRef={backCardRef} cardDeck={cardDeck} currentCard={currentCard} />
          {currentCard ? <StartButton currentCard={currentCard} closeDialog={closeDialog} /> : null}
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
              <Image className="card default-card" src={cardDefaultUrl} />
            </div>
            <div className="flip-card-back">
              <Image
                className="card-img"
                src={cardToImageUrl(currentCard)}
                width="150"
                alt={currentCard.type}
              />
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

const BackCard = ({ currentCard, remainingCardCount, backCardRef }) => {
  return (
    <div
      ref={backCardRef}
      className="card default-card"
      id="back-deck-card"
      style={{ background: "none" }}
    >
      <Image src={cardDefaultUrl} width="150" />
      {!currentCard && <div className="remaining-cards-number">{remainingCardCount}</div>}
    </div>
  )
}

const DeckButton = ({ cardDeck, currentCard, backCardRef }) => {
  if (currentCard) {
    return null
  }

  if (cardDeck.length === 0) {
    return <ButtonShuffleDeck backCardRef={backCardRef} />
  }

  return <ButtonDrawCard />
}

const ButtonDrawCard = () => {
  const drawCard = useDrawCard()

  return (
    <button className="button-card-main button-draw-card" onClick={drawCard}>
      Piocher
    </button>
  )
}

const ButtonShuffleDeck = ({ backCardRef }) => {
  const shuffleDeck = useShuffleDeck()
  const [shufflePending, sufflePendingSetter] = React.useState(false)

  const startShuffle = () => {
    sufflePendingSetter(true)
  }

  React.useEffect(() => {
    if (!shufflePending) {
      return () => {}
    }

    backCardRef.current.setAttribute("shaking-deck", "")
    const timeoutId = setTimeout(() => {
      backCardRef.current.removeAttribute("shaking-deck", "")
      shuffleDeck()
      sufflePendingSetter(false)
    }, 1000)

    return () => {
      backCardRef.current.removeAttribute("shaking-deck", "")
      clearTimeout(timeoutId)
    }
  }, [shufflePending])

  return (
    <button className="button-card-main button-shuffle-deck" onClick={startShuffle}>
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

const StartButton = () => {
  const activateCurrentCard = useActivateCurrentCard()

  const start = () => {
    const animationDuration = 500
    animateCard(animationDuration)
    setTimeout(() => {
      activateCurrentCard()
    }, animationDuration)
  }

  return (
    <button
      className="button-card-main button-activate-card"
      onClick={() => {
        start()
      }}
    >
      Commencer
    </button>
  )
}
