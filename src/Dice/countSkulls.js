import { isOneSkullCard, isTwoSkullsCard } from "src/Cards/cards.js"

export const countSkulls = ({ card, diceCursed }) => {
  if (isOneSkullCard(card)) {
    return diceCursed.length + 1
  }

  if (isTwoSkullsCard(card)) {
    return diceCursed.length + 2
  }

  return diceCursed.length
}
