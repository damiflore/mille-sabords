export const getMixedDeck = () => {
  return mixDeck(createInitialDeck())
}

const createInitialDeck = () =>
  createDeck({
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

export const mixDeck = (deck) => {
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

export const CARD_PIRATE = "pirate"

export const CARD_WITCH = "witch"

export const CARD_CHEST = "chest"

export const CARD_ANIMALS = "animals"

export const CARD_DIAMOND = "diamond"

export const CARD_COIN = "coin"

export const CARD_ONE_SKULL = "1skull"

export const CARD_TWO_SKULLS = "2skulls"

export const CARD_TWO_SWORDS_CHALLENGE = "2sword-challenge"

export const CARD_THREE_SWORDS_CHALLENGE = "3sword-challenge"

export const CARD_FOUR_SWORDS_CHALLENGE = "4sword-challenge"

export const TWO_SWORDS_CHALLENGE_GAMBLE = 300

export const THREE_SWORDS_CHALLENGE_GAMBLE = 500

export const FOUR_SWORDS_CHALLENGE_GAMBLE = 1000
