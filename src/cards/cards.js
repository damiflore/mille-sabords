import { SYMBOL_SKULL, SYMBOL_DIAMOND, SYMBOL_COIN } from "src/constants.js"
import { faces, createDice } from "src/dices/dices.js"

export const CARD_ANIMALS = "animals"
export const CARD_CHEST = "chest"
export const CARD_COIN = "coin"
export const CARD_DIAMOND = "diamond"
export const CARD_PIRATE = "pirate"
export const CARD_WITCH = "witch"
export const CARD_ONE_SKULL = "1skull"
export const CARD_TWO_SKULLS = "2skulls"
export const CARD_TWO_SWORDS_CHALLENGE = "2sword-challenge"
export const CARD_THREE_SWORDS_CHALLENGE = "3sword-challenge"
export const CARD_FOUR_SWORDS_CHALLENGE = "4sword-challenge"

export const DICE_SKULL_FROM_CARD_ONE_SKULL = createDice({
  fromCard: CARD_ONE_SKULL,
  visibleFaceIndex: faces.indexOf(SYMBOL_SKULL),
})

export const DICE_SKULL_1_FROM_CARD_TWO_SKULLS = createDice({
  fromCard: CARD_TWO_SKULLS,
  visibleFaceIndex: faces.indexOf(SYMBOL_SKULL),
})

export const DICE_SKULL_2_FROM_CARD_TWO_SKULLS = createDice({
  fromCard: CARD_TWO_SKULLS,
  visibleFaceIndex: faces.indexOf(SYMBOL_SKULL),
})

export const DICE_COIN_FROM_CARD_COIN = createDice({
  fromCard: CARD_COIN,
  visibleFaceIndex: faces.indexOf(SYMBOL_COIN),
})

export const DICE_DIAMOND_FROM_CARD_DIAMOND = createDice({
  fromCard: CARD_DIAMOND,
  visibleFaceIndex: faces.indexOf(SYMBOL_DIAMOND),
})

export const isDiamondDiceFromCard = (dice) => dice.fromCard === CARD_DIAMOND
export const isCoinDiceFromCard = (dice) => dice.fromCard === CARD_COIN
export const isSkullDiceFromCard = (dice) =>
  dice.fromCard === CARD_ONE_SKULL || dice.fromCard === CARD_TWO_SKULLS

export const createDeck = (repartition) => {
  const cards = []

  Object.keys(repartition).forEach((cardType) => {
    const quantity = repartition[cardType]
    for (var i = 0; i < quantity; i++) {
      const card = cardType
      cards.push(card)
    }
  })

  return cards
}

export const CARDS = createDeck({
  [CARD_PIRATE]: 4,
  [CARD_WITCH]: 4,
  [CARD_CHEST]: 4,
  [CARD_ANIMALS]: 4,
  [CARD_DIAMOND]: 4,
  [CARD_COIN]: 3,
  [CARD_ONE_SKULL]: 3,
  [CARD_TWO_SKULLS]: 2,
  [CARD_TWO_SWORDS_CHALLENGE]: 2,
  [CARD_THREE_SWORDS_CHALLENGE]: 3,
  [CARD_FOUR_SWORDS_CHALLENGE]: 4,
})

export const mixDeck = (deck) => {
  const deckMixed = [...deck]
  for (var i = 0; i < 100; i++) swapTwoCards(deckMixed)
  return deckMixed
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

export const isPirateCard = (card) => card === CARD_PIRATE
export const isWitchCard = (card) => card === CARD_WITCH
export const isChestCard = (card) => card === CARD_CHEST
export const isAnimalsCard = (card) => card === CARD_ANIMALS
export const isDiamondCard = (card) => card === CARD_DIAMOND
export const isCoinCard = (card) => card === CARD_COIN
export const isOneSkullCard = (card) => card === CARD_ONE_SKULL
export const isTwoSkullsCard = (card) => card === CARD_TWO_SKULLS
export const isTwoSwordsChallengeCard = (card) => card === CARD_TWO_SWORDS_CHALLENGE
export const isThreeSwordsChallengeCard = (card) => card === CARD_THREE_SWORDS_CHALLENGE
export const isFourSwordsChallengeCard = (card) => card === CARD_FOUR_SWORDS_CHALLENGE
export const isSwordChallengeCard = (card) =>
  isTwoSwordsChallengeCard(card) ||
  isThreeSwordsChallengeCard(card) ||
  isFourSwordsChallengeCard(card)

export const TWO_SWORDS_CHALLENGE_GAMBLE = {
  numberOfSwords: 2,
  gambleAmount: 300,
}
export const THREE_SWORDS_CHALLENGE_GAMBLE = {
  numberOfSwords: 3,
  gambleAmount: 500,
}
export const FOUR_SWORDS_CHALLENGE_GAMBLE = {
  numberOfSwords: 4,
  gambleAmount: 1000,
}

export const cardColors = {
  [CARD_PIRATE]: { color1: "#E6A9AB", color2: "#C1272D" },
  [CARD_WITCH]: { color1: "#757092", color2: "#482399" },
  [CARD_CHEST]: { color1: "#C69C6D", color2: "#8C6239" },
  [CARD_ANIMALS]: { color1: "#99D380", color2: "#39B100" },
  [CARD_DIAMOND]: { color1: "#95C1E5", color2: "#3E57A6" },
  [CARD_COIN]: { color1: "#FFF5BB", color2: "#CE9109" },
  [CARD_ONE_SKULL]: { color1: "#666666", color2: "#000000" },
  [CARD_TWO_SKULLS]: { color1: "#666666", color2: "#000000" },
  [CARD_TWO_SWORDS_CHALLENGE]: { color1: "#F4B392", color2: "#CB6828" },
  [CARD_THREE_SWORDS_CHALLENGE]: { color1: "#F4B392", color2: "#CB6828" },
  [CARD_FOUR_SWORDS_CHALLENGE]: { color1: "#F4B392", color2: "#CB6828" },
}