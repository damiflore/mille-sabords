import { diceToVisibleSymbol } from "root/src/app/dices/dices.js"

export const chestSlotContentToSymbol = (chestSlotContent, dices) => {
  if (chestSlotContent && chestSlotContent.type === "symbol") {
    return chestSlotContent.value
  }

  if (chestSlotContent && chestSlotContent.type === "dice") {
    const diceId = chestSlotContent.value
    const dice = dices[diceId]
    return diceToVisibleSymbol(dice)
  }

  return null
}
