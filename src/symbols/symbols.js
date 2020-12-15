const symbolCoinUrl = new URL("/src/dices/dice_coin.png", import.meta.url)
const symbolDiamondUrl = new URL("/src/dices/dice_diamond.png", import.meta.url)
const symbolMonkeyUrl = new URL("/src/dices/dice_monkey.png", import.meta.url)
const symbolParrotUrl = new URL("/src/dices/dice_parrot.png", import.meta.url)
const symbolSkullUrl = new URL("/src/dices/dice_skull.png", import.meta.url)
const symbolSwordUrl = new URL("/src/dices/dice_sword.png", import.meta.url)

export const SYMBOL_COIN = "coin"
export const SYMBOL_DIAMOND = "diamond"
export const SYMBOL_MONKEY = "monkey"
export const SYMBOL_PARROT = "parrot"
export const SYMBOL_SKULL = "skull"
export const SYMBOL_SWORD = "sword"

export const symbolIsSkull = (symbol) => symbol === SYMBOL_SKULL
export const symbolIsCoin = (symbol) => symbol === SYMBOL_COIN
export const symbolIsDiamond = (symbol) => symbol === SYMBOL_DIAMOND
export const symbolIsMonkey = (symbol) => symbol === SYMBOL_MONKEY
export const symbolIsParrot = (symbol) => symbol === SYMBOL_PARROT

export const SYMBOLS = [
  SYMBOL_COIN,
  SYMBOL_DIAMOND,
  SYMBOL_MONKEY,
  SYMBOL_PARROT,
  SYMBOL_SKULL,
  SYMBOL_SWORD,
]

const symbolUrlMap = {
  [SYMBOL_COIN]: symbolCoinUrl,
  [SYMBOL_DIAMOND]: symbolDiamondUrl,
  [SYMBOL_MONKEY]: symbolMonkeyUrl,
  [SYMBOL_PARROT]: symbolParrotUrl,
  [SYMBOL_SKULL]: symbolSkullUrl,
  [SYMBOL_SWORD]: symbolSwordUrl,
}

export {
  symbolCoinUrl,
  symbolDiamondUrl,
  symbolMonkeyUrl,
  symbolParrotUrl,
  symbolSkullUrl,
  symbolSwordUrl,
}

export const symbolToImageUrl = (symbol) => symbolUrlMap[symbol]
