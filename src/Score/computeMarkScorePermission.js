import { countSkulls } from "/src/Dice/countSkulls.js"
import { CARD_CHEST } from "/src/Cards/card-types.js"
import { HAS_THREE_SKULLS_OR_MORE } from "/src/constants.js"

export const computeMarkScorePermission = ({ rollIndex, card, diceCursed, scoreMarked }) => {
  if (scoreMarked) {
    return {
      allowed: false,
    }
  }

  const skullCount = countSkulls({ card, diceCursed })
  if (skullCount > 2) {
    if (card.type === CARD_CHEST && rollIndex > 0) {
      return {
        allowed: true,
      }
    }

    return {
      allowed: false,
      reason: HAS_THREE_SKULLS_OR_MORE,
    }
  }

  return {
    allowed: true,
  }
}
