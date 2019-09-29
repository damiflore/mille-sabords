import { countSkulls } from "/src/Dice/countSkulls.js"
import {
  NOT_ENOUGH_DICE_TO_ROLL,
  HAS_THREE_SKULLS_OR_MORE,
  ROUND_NOT_STARTED,
  CARD_NOT_DRAWN,
} from "/src/constants.js"

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
      reason: CARD_NOT_DRAWN,
    }
  }

  if (scoreMarked) {
    return {
      allowed: false,
      reason: ROUND_NOT_STARTED,
    }
  }

  if (countSkulls({ card, diceCursed }) > 2) {
    return {
      allowed: false,
      reason: HAS_THREE_SKULLS_OR_MORE,
    }
  }

  if (rollIndex > 0 && diceOnGoing.length < 2) {
    return {
      allowed: false,
      reason: NOT_ENOUGH_DICE_TO_ROLL,
    }
  }

  return {
    allowed: true,
    reason: "",
  }
}
