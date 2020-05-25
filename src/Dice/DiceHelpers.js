import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_SWORD,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SKULL,
  CARD_ONE_SKULL,
  CARD_TWO_SKULLS,
  CARD_DIAMOND,
  CARD_COIN,
} from "src/constants.js"

export const getDiceArray = () => {
  return DICE_ARRAY.map((dice) => {
    return { ...dice }
  })
}

const diceBaseProperties = { x: 0, y: 0 }

const DICE_ARRAY = [
  { ...diceBaseProperties, id: 1, symbol: SYMBOL_COIN },
  { ...diceBaseProperties, id: 2, symbol: SYMBOL_DIAMOND },
  { ...diceBaseProperties, id: 3, symbol: SYMBOL_SWORD },
  { ...diceBaseProperties, id: 4, symbol: SYMBOL_PARROT },
  { ...diceBaseProperties, id: 5, symbol: SYMBOL_MONKEY },
  { ...diceBaseProperties, id: 6, symbol: SYMBOL_SKULL },
  { ...diceBaseProperties, id: 7, symbol: SYMBOL_SKULL },
  { ...diceBaseProperties, id: 8, symbol: SYMBOL_SKULL },
]

export const skullDiceFromOneSkullCard = {
  ...diceBaseProperties,
  fromCard: CARD_ONE_SKULL,
  id: 9,
  symbol: SYMBOL_SKULL,
}

export const firstSkullDiceFromTwoSkullsCard = {
  ...diceBaseProperties,
  fromCard: CARD_TWO_SKULLS,
  id: 9,
  symbol: SYMBOL_SKULL,
}
export const secondSkullDiceFromTwoSkullsCard = {
  ...firstSkullDiceFromTwoSkullsCard,
  fromCard: CARD_TWO_SKULLS,
  id: 10,
}

export const diamondDiceFromCard = {
  ...diceBaseProperties,
  fromCard: CARD_DIAMOND,
  id: 9,
  symbol: SYMBOL_DIAMOND,
}

export const coinDiceFromCard = {
  ...diceBaseProperties,
  fromCard: CARD_COIN,
  id: 9,
  symbol: SYMBOL_COIN,
}

export const isDiamondDiceFromCard = (dice) => dice.fromCard === CARD_DIAMOND

export const isCoinDiceFromCard = (dice) => dice.fromCard === CARD_COIN

export const isSkullDiceFromCard = (dice) =>
  dice.fromCard === CARD_ONE_SKULL || dice.fromCard === CARD_TWO_SKULLS
