import { countSkulls } from "src/Dice/countSkulls.js"
import { isSwordChallengeCard } from "src/Cards/cards.js"

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
  if (rollIndex !== 0) return false

  if (isSwordChallengeCard(card)) return false

  return true
}

const isSentToSkullIsland = ({ card, diceCursed }) => {
  return countSkulls({ card, diceCursed }) >= 4
}
