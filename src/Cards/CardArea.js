import React from "react"
import { useGameStore } from "src/MilleSabordGame.js"
import { mixDeck } from "src/Cards/cards.js"

export const CardArea = () => {
  const { cardDeck } = useGameStore()

  return (
    <div className="card-area">
      <div className="remaining-cards-number">{cardDeck.length}</div>
      <CurrentCard />
      <div
        className="card default-card"
        style={{ backgroundImage: "url('src/Cards/assets/card_default.png')" }}
      >
        <DeckButton />
      </div>
    </div>
  )
}

const CurrentCard = () => {
  const { card, cardDrawn } = useGameStore()

  if (!card) return null
  if (!cardDrawn) return null

  return (
    <div className="card current-card">
      <img src={`src/Cards/assets/card_${card}.png`} alt={card} />
    </div>
  )
}

const DeckButton = () => {
  const { cardDrawn, cardDeck } = useGameStore()

  if (cardDrawn) return null

  if (cardDeck.length === 0) return <ShuffleDeckButton />

  return <DrawCardButton />
}

const drawCard = ({ cardDeck, cardsUsed, setCard, setCardDeck, setCardDrawn, setCardsUsed }) => {
  setCardDrawn(true)
  const cardDrawn = cardDeck[0]
  setCardsUsed([...cardsUsed, cardDrawn])
  setCard(cardDeck[0])
  setCardDeck(cardDeck.slice(1))
}

const DrawCardButton = () => {
  const store = useGameStore()

  return (
    <button
      className="draw-card-btn"
      onClick={() => {
        drawCard(store)
      }}
    >
      Draw a card
    </button>
  )
}

const ShuffleDeckButton = () => {
  const store = useGameStore()

  return (
    <button
      className="draw-card-btn"
      onClick={() => {
        shuffleDeck(store)
      }}
    >
      Shuffle deck
    </button>
  )
}

const shuffleDeck = ({ cardsUsed, setCardsUsed, setCardDeck }) => {
  const newDeck = cardsUsed.slice()
  mixDeck(newDeck)
  setCardsUsed([])
  setCardDeck(newDeck)
}
