import { countSkulls } from "src/Dice/countSkulls.js"
import { CARD_SWORD_CHALLENGE } from "src/Cards/card-types.js"

export const computeIsOnSkullIsland = ({ isOnSkullIsland, card, rollIndex, diceCursed }) => {
  if (isOnSkullIsland) {
    return true
  }

  if (canGoOnSkullIsland({ card, rollIndex }) && isSentToSkullIsland({ card, diceCursed })) {
    return true
  }

  return false
}

const canGoOnSkullIsland = ({ card, rollIndex }) => {
  return rollIndex === 0 && card.type !== CARD_SWORD_CHALLENGE
}

const isSentToSkullIsland = ({ card, diceCursed }) => {
  return countSkulls({ card, diceCursed }) >= 4
}
