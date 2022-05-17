import {
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_SWORD,
  SYMBOL_PARROT,
  SYMBOL_MONKEY,
  SYMBOL_SKULL,
} from "/src/app/symbols/symbols.js"

export const faces = [
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
]

// Don't use an id: 0
// Otherwise if(witchUncursedDiceId) would return false and we would have to check
// if (typeof witchUncursedDiceId === 'number')
let diceId = 1
const createDice = (props) => {
  return {
    faces,
    visibleFaceIndex: 0,
    id: diceId++,
    ...props,
  }
}

export const DICES = {}
new Array(8).fill("").forEach(() => {
  const dice = createDice()
  DICES[dice.id] = dice
})

export const diceIsOnCoin = (dice) => diceToVisibleSymbol(dice) === SYMBOL_COIN
export const diceIsOnDiamond = (dice) =>
  diceToVisibleSymbol(dice) === SYMBOL_DIAMOND
export const diceIsOnmonkey = (dice) =>
  diceToVisibleSymbol(dice) === SYMBOL_MONKEY
export const diceIsOnParrot = (dice) =>
  diceToVisibleSymbol(dice) === SYMBOL_PARROT
export const diceIsOnSkull = (dice) =>
  diceToVisibleSymbol(dice) === SYMBOL_SKULL
export const diceIsOnSword = (dice) =>
  diceToVisibleSymbol(dice) === SYMBOL_SWORD
export const diceToVisibleSymbol = ({ faces, visibleFaceIndex }) =>
  faces[visibleFaceIndex]
