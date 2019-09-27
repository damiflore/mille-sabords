import { countSkulls } from "/src/Dice/countSkulls.js"

export const computeRollDicePermission = ({
  cardDrawn,
  scoreMarked,
  card,
  diceCursed,
  rollIndex,
  diceOnGoing,
}) => {
  if (!cardDrawn) {
    return {
      allowed: false,
      reason: "you must draw a card",
    }
  }

  if (scoreMarked) {
    return {
      allowed: false,
      reason: "you must restart",
    }
  }

  if (countSkulls({ card, diceCursed }) > 2) {
    return {
      allowed: false,
      reason: "3 skulls or more",
    }
  }

  if (rollIndex > 0 && diceOnGoing.length < 2) {
    return {
      allowed: false,
      reason: "you must roll at least two dice",
    }
  }

  return {
    allowed: true,
    reason: "",
  }
}
