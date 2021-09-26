import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
} from "root/src/app/symbols/symbols.js"
import {
  cardIds,
  cardIdToCard,
  isAnimalsCard,
  isChestCard,
  isCoinCard,
  isPirateCard,
  isTwoSwordsChallengeCard,
} from "root/src/app/cards/cards.js"

export const getFirstAnimalsCardFromDeck = () =>
  getFirstCardFromDeckMatching(isAnimalsCard)
export const getFirstChestCardFromDeck = () =>
  getFirstCardFromDeckMatching(isChestCard)
export const getFirstCoinCardFromDeck = () =>
  getFirstCardFromDeckMatching(isCoinCard)
export const getFirstPirateCardFromDeck = () =>
  getFirstCardFromDeckMatching(isPirateCard)
export const getFirstTwoSwordsChallengeCardFromDeck = () =>
  getFirstCardFromDeckMatching(isTwoSwordsChallengeCard)
const getFirstCardFromDeckMatching = (predicate) => {
  const cardId = cardIds.find((cardId) => predicate(cardIdToCard(cardId)))
  return cardIdToCard(cardId)
}

export const createCoinFromDice = () => SYMBOL_COIN
export const createDiamondFromDice = () => SYMBOL_DIAMOND
export const createMonkeyFromDice = () => SYMBOL_MONKEY
export const createParrotFromDice = () => SYMBOL_PARROT
export const createSkullFromDice = () => SYMBOL_SKULL
export const createSwordFromDice = () => SYMBOL_SWORD
export const createCoinFromCard = () => SYMBOL_COIN
export const createDiamondFromCard = () => SYMBOL_DIAMOND
