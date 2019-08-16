export const initialDeck = [
  { type: "pirate", cardQuantiy: 4, label: "Pirate" },
  { type: "witch", cardQuantiy: 4, label: "Witch" },
  { type: "chest", cardQuantiy: 4, label: "Treasure chest" }, // card effect TODO
  { type: "animals", cardQuantiy: 4, label: "Parrot = monkey" },

  { type: "diamond", cardQuantiy: 4, label: "Diamond" },
  { type: "coin", cardQuantiy: 3, label: "Coin" },
  { type: "skull", skullAmount: 1, cardQuantiy: 3, label: "1 skull" },
  { type: "skull", skullAmount: 2, cardQuantiy: 2, label: "2 skulls" },

  {
    type: "sword-challenge",
    goal: 2,
    gamble: 300,
    cardQuantiy: 2,
    label: "2 sword challenge",
  }, // card effect TODO
  {
    type: "sword-challenge",
    goal: 3,
    gamble: 500,
    cardQuantiy: 3,
    label: "3 sword challenge",
  }, // card effect TODO
  {
    type: "sword-challenge",
    goal: 4,
    gamble: 1000,
    cardQuantiy: 2,
    label: "4 sword challenge",
  }, // card effect TODO
]

const addCopiesOf = (arr, card) => {
  for (var i = 0; i < card.cardQuantiy; i++) arr.push(card)
  return arr
}

const createInitialDeck = () => {
  let cardDeck = []
  initialDeck.forEach((card) => {
    cardDeck = addCopiesOf(cardDeck, card)
  })
  return cardDeck
}

const randomIndex = (arrayLength) => Math.floor(Math.random() * arrayLength)

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

const mixCards = (deck) => {
  for (var i = 0; i < 100; i++) swapTwoCards(deck)
  return deck
}

export const getMixedDeck = () => {
  return mixCards(createInitialDeck())
}
