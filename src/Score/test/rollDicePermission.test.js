import { assert } from "@jsenv/assert"
import { useRollDicePermission } from "src/game.selectors.js"
import {
  NOT_ENOUGH_DICE_TO_ROLL,
  HAS_THREE_SKULLS_OR_MORE,
  ROUND_NOT_STARTED,
  CARD_NOT_DRAWN,
} from "src/constants.js"
import { CARD_TWO_SKULLS } from "src/Cards/cards.js"

// card not drawn
{
  const actual = useRollDicePermission({
    cardDrawn: false,
  })
  const expected = {
    allowed: false,
    reason: CARD_NOT_DRAWN,
  }
  assert({ actual, expected })
}

// round not started
{
  const actual = useRollDicePermission({
    cardDrawn: true,
    scoreMarked: true,
  })
  const expected = {
    allowed: false,
    reason: ROUND_NOT_STARTED,
  }
  assert({ actual, expected })
}

// dice never rolled
{
  const actual = useRollDicePermission({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [],
    rollIndex: -1,
  })
  const expected = {
    allowed: true,
    reason: "",
  }
  assert({ actual, expected })
}

// not enough dice to roll
{
  const actual = useRollDicePermission({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [],
    rollIndex: 0,
    diceInGame: [0],
  })
  const expected = {
    allowed: false,
    reason: NOT_ENOUGH_DICE_TO_ROLL,
  }
  assert({ actual, expected })
}

// too many skulls (will need update for skull island)
{
  const actual = useRollDicePermission({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [0],
  })
  const expected = {
    allowed: false,
    reason: HAS_THREE_SKULLS_OR_MORE,
  }
  assert({ actual, expected })
}
