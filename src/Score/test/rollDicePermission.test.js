import { assert } from "@jsenv/assert"
import { rollDicePermissionSelector } from "src/game.selectors.js"
import {
  NOT_ENOUGH_DICE_TO_ROLL,
  HAS_THREE_SKULLS_OR_MORE,
  ROUND_NOT_STARTED,
  CARD_NOT_DRAWN,
  SYMBOL_SKULL,
  CARD_TWO_SKULLS,
  CARD_ONE_SKULL,
} from "src/constants.js"

// card not drawn
{
  const actual = rollDicePermissionSelector({
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
  const actual = rollDicePermissionSelector({
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
  const actual = rollDicePermissionSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [],
    rollIndex: -1,
  })
  const expected = {
    allowed: true,
  }
  assert({ actual, expected })
}

// skulls in rolled area
{
  const actual = rollDicePermissionSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_ONE_SKULL,
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from the card
    ],
    diceRolled: [{ symbol: SYMBOL_SKULL }],
    rollIndex: 0,
  })
  const expected = {
    allowed: false,
    reason: "",
  }
  assert({ actual, expected })
}

// skulls in rolled area (but uncursed by witch)
{
  const skullDice = { symbol: SYMBOL_SKULL }
  const actual = rollDicePermissionSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from the card
      { symbol: SYMBOL_SKULL }, // from the card
    ],
    diceRolled: [skullDice, {}],
    diceUncursedByWitch: skullDice,
    rollIndex: 0,
  })
  const expected = {
    allowed: true,
  }
  assert({ actual, expected })
}

// not enough dice to roll
{
  const actual = rollDicePermissionSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from the card
      { symbol: SYMBOL_SKULL }, // from the card
    ],
    rollIndex: 0,
    diceRolled: [0],
  })
  const expected = {
    allowed: false,
    reason: NOT_ENOUGH_DICE_TO_ROLL,
  }
  assert({ actual, expected })
}

// too many skulls (will need update for skull island)
{
  const actual = rollDicePermissionSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from the card
      { symbol: SYMBOL_SKULL }, // from the card
      { symbol: SYMBOL_SKULL },
    ],
  })
  const expected = {
    allowed: false,
    reason: HAS_THREE_SKULLS_OR_MORE,
  }
  assert({ actual, expected })
}
