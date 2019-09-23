import { CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"

export const canGoOnSkullIsland = ({ card, rollIndex }) => {
  return rollIndex === 0 && card.type !== CARD_SWORD_CHALLENGE
}
