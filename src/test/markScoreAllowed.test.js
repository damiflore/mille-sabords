import { assert } from "@jsenv/assert"
import {
  SYMBOL_SKULL,
  CARD_ONE_SKULL,
  CARD_ANIMALS,
  CARD_CHEST,
  CARD_TWO_SKULLS,
  CARD_WITCH,
} from "src/constants.js"
import { markScoreAllowedSelector } from "src/game.selectors.js"

// with 3 skulls
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_ANIMALS,
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
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
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
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
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
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
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
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
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from card
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
    ],
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
      { symbol: SYMBOL_SKULL }, // from card
      { symbol: SYMBOL_SKULL }, // from card
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
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
      { symbol: SYMBOL_SKULL }, // from card
      { symbol: SYMBOL_SKULL }, // from card
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
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
    diceRolled: [{ symbol: SYMBOL_SKULL, id: 12 }],
  })
  const expected = false
  assert({ actual, expected })
}

// skull in rolled area uncursed by witch
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_WITCH,
    diceCursed: [],
    scoreMarked: false,
    diceRolled: [{ symbol: SYMBOL_SKULL, id: 12 }],
    witchUncursedDiceId: 12,
  })
  const expected = true
  assert({ actual, expected })
}

// skull in rolled area different that the one uncursed by witch
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_WITCH,
    diceCursed: [],
    scoreMarked: false,
    diceRolled: [
      { symbol: SYMBOL_SKULL, id: 12 },
      { symbol: SYMBOL_SKULL, id: 13 },
    ],
    witchUncursedDiceId: 12,
  })
  const expected = false
  assert({ actual, expected })
}
