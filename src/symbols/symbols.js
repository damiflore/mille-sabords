import symbolCoinUrl from "src/dices/dice_coin.png"
import symbolDiamondUrl from "src/dices/dice_diamond.png"
import symbolMonkeyUrl from "src/dices/dice_monkey.png"
import symbolParrotUrl from "src/dices/dice_parrot.png"
import symbolSkullUrl from "src/dices/dice_skull.png"
import symbolSwordUrl from "src/dices/dice_sword.png"

export const SYMBOL_COIN = "coin"
export const SYMBOL_DIAMOND = "diamond"
export const SYMBOL_MONKEY = "monkey"
export const SYMBOL_PARROT = "parrot"
export const SYMBOL_SKULL = "skull"
export const SYMBOL_SWORD = "sword"

export const symbolIsSkull = (symbol) => symbol === SYMBOL_SKULL
export const symbolIsCoin = (symbol) => symbol === SYMBOL_COIN

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
