import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_SWORD,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SKULL,
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

export const splitSkulls = (dices) => {
  const withoutSkulls = []
  const skulls = []

  dices.forEach((dice) => {
    if (dice.symbol === SYMBOL_SKULL) {
      skulls.push(dice)
    } else {
      withoutSkulls.push(dice)
    }
  })

  return { withoutSkulls, skulls }
}
