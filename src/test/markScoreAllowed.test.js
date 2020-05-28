import { assert } from "@jsenv/assert"
import {
  CARD_ONE_SKULL,
  CARD_ANIMALS,
  CARD_CHEST,
  CARD_TWO_SKULLS,
  CARD_WITCH,
  DICE_SKULL_FROM_CARD_ONE_SKULL,
  DICE_SKULL_1_FROM_CARD_TWO_SKULLS,
  DICE_SKULL_2_FROM_CARD_TWO_SKULLS,
} from "src/cards/cards.js"
import { markScoreAllowedSelector } from "src/game.selectors.js"
import { createDiceOnSkull } from "src/test/test.material.js"

// with 3 skulls
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_ANIMALS,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull(), createDiceOnSkull()],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = false
  assert({ actual, expected })
}

// no skull and user clicked on "Mark score"
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_ANIMALS,
    diceCursed: [],
    scoreMarked: true,
    diceRolled: [],
  })
  const expected = false
  assert({ actual, expected })
}

// with 3 skulls first roll + chest
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_CHEST,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull(), createDiceOnSkull()],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = false
  assert({ actual, expected })
}

// with 3 skulls second roll + chest
{
  const actual = markScoreAllowedSelector({
    rollIndex: 1,
    card: CARD_CHEST,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull(), createDiceOnSkull()],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = true
  assert({ actual, expected })
}

// less than 3 skulls, not clicked on mark score
{
  const actual = markScoreAllowedSelector({
    rollIndex: 1,
    card: CARD_CHEST,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull()],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = true
  assert({ actual, expected })
}

// with 2 skulls (dice) + 1 skull (card)
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_ONE_SKULL,
    diceCursed: [DICE_SKULL_FROM_CARD_ONE_SKULL, createDiceOnSkull(), createDiceOnSkull()],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = false
  assert({ actual, expected })
}

// with 2 skulls (dice) + 2 sull (card) - First roll
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_TWO_SKULLS,
    diceCursed: [
      DICE_SKULL_1_FROM_CARD_TWO_SKULLS,
      DICE_SKULL_2_FROM_CARD_TWO_SKULLS,
      createDiceOnSkull(),
      createDiceOnSkull(),
    ],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = false
  assert({ actual, expected })
}

// with 2 skulls (dice) + 2 sull (card) - Second roll
{
  const actual = markScoreAllowedSelector({
    rollIndex: 1,
    card: CARD_TWO_SKULLS,
    diceCursed: [
      DICE_SKULL_1_FROM_CARD_TWO_SKULLS,
      DICE_SKULL_2_FROM_CARD_TWO_SKULLS,
      createDiceOnSkull(),
      createDiceOnSkull(),
    ],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = false
  assert({ actual, expected })
}

// skull in rolled area ( = cursed animation ongoing)
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_ANIMALS,
    diceCursed: [],
    scoreMarked: false,
    diceRolled: [createDiceOnSkull()],
  })
  const expected = false
  assert({ actual, expected })
}

// skull in rolled area uncursed by witch
{
  const skullDice = createDiceOnSkull()
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_WITCH,
    diceCursed: [],
    scoreMarked: false,
    diceRolled: [skullDice],
    witchUncursedDiceId: skullDice.id,
  })
  const expected = true
  assert({ actual, expected })
}

// skull in rolled area different that the one uncursed by witch
{
  const skullDiceA = createDiceOnSkull()
  const skullDiceB = createDiceOnSkull()
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_WITCH,
    diceCursed: [],
    scoreMarked: false,
    diceRolled: [skullDiceA, skullDiceB],
    witchUncursedDiceId: skullDiceA.id,
  })
  const expected = false
  assert({ actual, expected })
}
