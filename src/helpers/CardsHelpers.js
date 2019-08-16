export const initialDeck = [
  { name: "pirate", numberOfCards: 4, label: "Pirate" },
  { name: "witch", numberOfCards: 4, label: "Witch" },
  { name: "chest", numberOfCards: 4, label: "Treasure chest" }, // card effect TODO
  { name: "animals", numberOfCards: 4, label: "Parrot = monkey" },
  { name: "diamond", numberOfCards: 4, label: "Diamond" },
  { name: "coin", numberOfCards: 3, label: "Coin" },
  { name: "skull", numberOfCards: 3, label: "Skull" },
  { name: "2skulls", numberOfCards: 2, label: "2 skulls" },
  { name: "2swords", numberOfCards: 2, label: "2 sword challenge" }, // card effect TODO
  { name: "3swords", numberOfCards: 3, label: "3 sword challenge" }, // card effect TODO
  { name: "4swords", numberOfCards: 2, label: "4 sword challenge" }, // card effect TODO
]

const addCopiesOf = (arr, card) => {
  for (var i = 0; i < card.numberOfCards; i++) arr.push(card)
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
