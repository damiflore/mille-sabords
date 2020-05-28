import { assert } from "@jsenv/assert"
import { rollDiceAllowedSelector } from "src/game.selectors.js"
import {
  CARD_TWO_SKULLS,
  CARD_ONE_SKULL,
  DICE_SKULL_FROM_CARD_ONE_SKULL,
  DICE_SKULL_1_FROM_CARD_TWO_SKULLS,
  DICE_SKULL_2_FROM_CARD_TWO_SKULLS,
} from "src/cards/cards.js"
import { createDiceOnCoin, createDiceOnSkull } from "src/test/test.material.js"

// card not drawn
{
  const actual = rollDiceAllowedSelector({
    cardDrawn: false,
  })
  const expected = false
  assert({ actual, expected })
}

// round not started
{
  const actual = rollDiceAllowedSelector({
    cardDrawn: true,
    scoreMarked: true,
  })
  const expected = false
  assert({ actual, expected })
}

// dice never rolled
{
  const actual = rollDiceAllowedSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [],
    rollIndex: -1,
  })
  const expected = true
  assert({ actual, expected })
}

// skulls in rolled area
{
  const actual = rollDiceAllowedSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_ONE_SKULL,
    diceCursed: [DICE_SKULL_FROM_CARD_ONE_SKULL],
    diceRolled: [createDiceOnSkull()],
    rollIndex: 0,
  })
  const expected = false
  assert({ actual, expected })
}

// skulls in rolled area (but uncursed by witch)
{
  const skullDice = createDiceOnSkull()
  const actual = rollDiceAllowedSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [DICE_SKULL_1_FROM_CARD_TWO_SKULLS, DICE_SKULL_2_FROM_CARD_TWO_SKULLS],
    diceRolled: [skullDice, createDiceOnCoin()],
    witchUncursedDiceId: skullDice.id,
    rollIndex: 0,
  })
  const expected = true
  assert({ actual, expected })
}

// not enough dice to roll
{
  const actual = rollDiceAllowedSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [DICE_SKULL_1_FROM_CARD_TWO_SKULLS, DICE_SKULL_2_FROM_CARD_TWO_SKULLS],
    rollIndex: 0,
    diceRolled: [createDiceOnCoin()],
  })
  const expected = false
  assert({ actual, expected })
}

// too many skulls (will need update for skull island)
{
  const actual = rollDiceAllowedSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [
      DICE_SKULL_1_FROM_CARD_TWO_SKULLS,
      DICE_SKULL_2_FROM_CARD_TWO_SKULLS,
      createDiceOnSkull(),
    ],
  })
  const expected = false
  assert({ actual, expected })
}
