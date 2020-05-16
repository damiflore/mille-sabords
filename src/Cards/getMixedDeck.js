import {
  CARD_PIRATE,
  CARD_WITCH,
  CARD_CHEST,
  CARD_ANIMALS,
  CARD_DIAMOND,
  CARD_COIN,
  CARD_SKULL,
  CARD_SWORD_CHALLENGE,
} from "./card-types.js"

export const getMixedDeck = () => {
  return mixCards(createInitialDeck())
}

const createInitialDeck = () => {
  let cardDeck = []
  initialDeck.forEach((card) => {
    cardDeck = addCopiesOf(cardDeck, card)
  })
  return cardDeck
}

const initialDeck = [
  { type: CARD_PIRATE, cardQuantiy: 4, label: "pirate" },
  { type: CARD_WITCH, cardQuantiy: 4, label: "witch" },
  { type: CARD_CHEST, cardQuantiy: 4, label: "chest" },
  { type: CARD_ANIMALS, cardQuantiy: 4, label: "animals" },
  { type: CARD_DIAMOND, cardQuantiy: 4, label: "diamond" },
  { type: CARD_COIN, cardQuantiy: 3, label: "coin" },
  { type: CARD_SKULL, skullAmount: 1, cardQuantiy: 3, label: "1skull" },
  { type: CARD_SKULL, skullAmount: 2, cardQuantiy: 2, label: "2skulls" },
  {
    type: CARD_SWORD_CHALLENGE,
    goal: 2,
    gamble: 300,
    cardQuantiy: 2,
    label: "2sword-challenge",
  },
  {
    type: CARD_SWORD_CHALLENGE,
    goal: 3,
    gamble: 500,
    cardQuantiy: 3,
    label: "3sword-challenge",
  },
  {
    type: CARD_SWORD_CHALLENGE,
    goal: 4,
    gamble: 1000,
    cardQuantiy: 2,
    label: "4sword-challenge",
  },
]

const addCopiesOf = (arr, card) => {
  for (var i = 0; i < card.cardQuantiy; i++) arr.push(card)
  return arr
}

const mixCards = (deck) => {
  for (var i = 0; i < 100; i++) swapTwoCards(deck)
  return deck
}

const swapTwoCards = (deck) => {
  // pick two random indexes
  const index1 = randomIndex(deck.length)
  const index2 = randomIndex(deck.length)
  // swap cards at these indexes
  const temp = deck[index1]
  deck[index1] = deck[index2]
  deck[index2] = temp
  return deck
}

const randomIndex = (arrayLength) => Math.floor(Math.random() * arrayLength)
