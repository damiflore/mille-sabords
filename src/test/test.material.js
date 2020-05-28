import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
} from "src/constants.js"
import { faces, createDice } from "src/dices/dices.js"

const createDiceOnSymbol = (symbol) => {
  return createDice({
    visibleFaceIndex: faces.indexOf(symbol),
  })
}

export const createDiceOnCoin = () => createDiceOnSymbol(SYMBOL_COIN)
export const createDiceOnDiamond = () => createDiceOnSymbol(SYMBOL_DIAMOND)
export const createDiceOnMonkey = () => createDiceOnSymbol(SYMBOL_MONKEY)
export const createDiceOnParrot = () => createDiceOnSymbol(SYMBOL_PARROT)
export const createDiceOnSkull = () => createDiceOnSymbol(SYMBOL_SKULL)
export const createDiceOnSword = () => createDiceOnSymbol(SYMBOL_SWORD)
