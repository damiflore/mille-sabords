/* eslint-disable import/max-dependencies */
const cardOneSkullSmallUrl = new URL("./card_small-1skull.png", import.meta.url)
const cardTwoSkullsSmallUrl = new URL(
  "./card_small-2skulls.png",
  import.meta.url,
)
const cardSwordChallengeSmallUrl = new URL(
  "./card_small-sword-challenge.png",
  import.meta.url,
)
const cardAnimalsSmallUrl = new URL("./card_small-animals.png", import.meta.url)
const cardChestSmallUrl = new URL("./card_small-chest.png", import.meta.url)
const cardCoinSmallUrl = new URL("./card_small-coin.png", import.meta.url)
const cardDiamondSmallUrl = new URL("./card_small-diamond.png", import.meta.url)
const cardPirateSmallUrl = new URL("./card_small-pirate.png", import.meta.url)
const cardWitchSmallUrl = new URL("./card_small-witch.png", import.meta.url)

const cardOneSkullUrl = new URL("./card_1skull.png", import.meta.url)
const cardTwoSkullsUrl = new URL("./card_2skulls.png", import.meta.url)
const cardTwoSwordChallengeUrl = new URL(
  "./card_2sword-challenge.png",
  import.meta.url,
)
const cardThreeSwordChallengeUrl = new URL(
  "./card_3sword-challenge.png",
  import.meta.url,
)
const cardFourSwordChallengeUrl = new URL(
  "./card_4sword-challenge.png",
  import.meta.url,
)
const cardAnimalsUrl = new URL("./card_animals.png", import.meta.url)
const cardChestUrl = new URL("./card_chest.png", import.meta.url)
const cardCoinUrl = new URL("./card_coin.png", import.meta.url)
const cardDefaultUrl = new URL("./card_default.png", import.meta.url)
const cardDiamondUrl = new URL("./card_diamond.png", import.meta.url)
const cardPirateUrl = new URL("./card_pirate.png", import.meta.url)
const cardWitchUrl = new URL("./card_witch.png", import.meta.url)

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

export const cardImageUrlMap = {
  [CARD_ONE_SKULL]: cardOneSkullUrl,
  [CARD_TWO_SKULLS]: cardTwoSkullsUrl,
  [CARD_TWO_SWORDS_CHALLENGE]: cardTwoSwordChallengeUrl,
  [CARD_THREE_SWORDS_CHALLENGE]: cardThreeSwordChallengeUrl,
  [CARD_FOUR_SWORDS_CHALLENGE]: cardFourSwordChallengeUrl,
  [CARD_ANIMALS]: cardAnimalsUrl,
  [CARD_CHEST]: cardChestUrl,
  [CARD_COIN]: cardCoinUrl,
  [CARD_DIAMOND]: cardDiamondUrl,
  [CARD_PIRATE]: cardPirateUrl,
  [CARD_WITCH]: cardWitchUrl,
}
export const cardToImageUrl = (card) => cardImageUrlMap[card.type]

const cardSmallImageUrlMap = {
  [CARD_ONE_SKULL]: cardOneSkullSmallUrl,
  [CARD_TWO_SKULLS]: cardTwoSkullsSmallUrl,
  [CARD_TWO_SWORDS_CHALLENGE]: cardSwordChallengeSmallUrl,
  [CARD_THREE_SWORDS_CHALLENGE]: cardSwordChallengeSmallUrl,
  [CARD_FOUR_SWORDS_CHALLENGE]: cardSwordChallengeSmallUrl,
  [CARD_ANIMALS]: cardAnimalsSmallUrl,
  [CARD_CHEST]: cardChestSmallUrl,
  [CARD_COIN]: cardCoinSmallUrl,
  [CARD_DIAMOND]: cardDiamondSmallUrl,
  [CARD_PIRATE]: cardPirateSmallUrl,
  [CARD_WITCH]: cardWitchSmallUrl,
}
export const cardToSmallImageUrl = (card) => cardSmallImageUrlMap[card.type]

export { cardDefaultUrl }

const cardData = {
  [CARD_ANIMALS]: {
    type: CARD_ANIMALS,
    color1: "#99D380",
    color2: "#39B100",
  },
  [CARD_CHEST]: {
    type: CARD_CHEST,
    color1: "#C69C6D",
    color2: "#8C6239",
  },
  [CARD_COIN]: {
    type: CARD_COIN,
    color1: "#FFF5BB",
    color2: "#CE9109",
  },
  [CARD_DIAMOND]: {
    type: CARD_DIAMOND,
    color1: "#95C1E5",
    color2: "#3E57A6",
  },
  [CARD_PIRATE]: {
    type: CARD_PIRATE,
    color1: "#E6A9AB",
    color2: "#C1272D",
  },
  [CARD_WITCH]: {
    type: CARD_WITCH,
    color1: "#757092",
    color2: "#482399",
  },
  [CARD_ONE_SKULL]: {
    type: CARD_ONE_SKULL,
    color1: "#666666",
    color2: "#000000",
  },
  [CARD_TWO_SKULLS]: {
    type: CARD_TWO_SKULLS,
    color1: "#666666",
    color2: "#000000",
  },
  [CARD_TWO_SWORDS_CHALLENGE]: {
    type: CARD_TWO_SWORDS_CHALLENGE,
    color1: "#F4B392",
    color2: "#CB6828",
    numberOfSwords: 2,
    gambleAmount: 300,
  },
  [CARD_THREE_SWORDS_CHALLENGE]: {
    type: CARD_THREE_SWORDS_CHALLENGE,
    color1: "#F4B392",
    color2: "#CB6828",
    numberOfSwords: 3,
    gambleAmount: 500,
  },
  [CARD_FOUR_SWORDS_CHALLENGE]: {
    type: CARD_FOUR_SWORDS_CHALLENGE,
    color1: "#F4B392",
    color2: "#CB6828",
    numberOfSwords: 4,
    gambleAmount: 1000,
  },
}

const createDeck = (repartition) => {
  const cards = []

  Object.keys(repartition).forEach((cardType) => {
    const quantity = repartition[cardType]
    for (var i = 0; i < quantity; i++) {
      const card = {
        id: cards.length + 1,
        ...cardData[cardType],
      }
      cards.push(card)
    }
  })

  return cards
}

const CARDS = createDeck({
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

export const cardIds = CARDS.map((card) => card.id)
export const cardIdToCard = (cardId) =>
  CARDS.find((cardCandidate) => cardCandidate.id === cardId)

export const isPirateCard = (card) => card.type === CARD_PIRATE
export const isWitchCard = (card) => card.type === CARD_WITCH
export const isChestCard = (card) => card.type === CARD_CHEST
export const isAnimalsCard = (card) => card.type === CARD_ANIMALS
export const isDiamondCard = (card) => card.type === CARD_DIAMOND
export const isCoinCard = (card) => card.type === CARD_COIN
export const isOneSkullCard = (card) => card.type === CARD_ONE_SKULL
export const isTwoSkullsCard = (card) => card.type === CARD_TWO_SKULLS
export const isTwoSwordsChallengeCard = (card) =>
  card.type === CARD_TWO_SWORDS_CHALLENGE
export const isThreeSwordsChallengeCard = (card) =>
  card.type === CARD_THREE_SWORDS_CHALLENGE
export const isFourSwordsChallengeCard = (card) =>
  card.type === CARD_FOUR_SWORDS_CHALLENGE
export const isSwordChallengeCard = (card) =>
  isTwoSwordsChallengeCard(card) ||
  isThreeSwordsChallengeCard(card) ||
  isFourSwordsChallengeCard(card)

export const cardList = [
  CARD_PIRATE,
  CARD_WITCH,
  CARD_CHEST,
  CARD_ANIMALS,
  CARD_DIAMOND,
  CARD_COIN,
  CARD_ONE_SKULL,
  CARD_TWO_SKULLS,
  CARD_TWO_SWORDS_CHALLENGE,
  CARD_THREE_SWORDS_CHALLENGE,
  CARD_FOUR_SWORDS_CHALLENGE,
]
