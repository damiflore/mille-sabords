import { CARD_SKULL } from "src/Cards/card-types.js"

export const isSentToSkullIsland = ({ card, diceCursed }) => {
  let numerOfSkulls = diceCursed.length
  if (card.type === CARD_SKULL) numerOfSkulls += card.skullAmount
  return numerOfSkulls >= 4
}
