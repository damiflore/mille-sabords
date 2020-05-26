import { assert } from "@jsenv/assert"
import {
  SYMBOL_SKULL,
  CARD_ONE_SKULL,
  CARD_ANIMALS,
  CARD_CHEST,
  CARD_TWO_SKULLS,
} from "src/constants.js"
import { markScoreAllowedSelector } from "src/game.selectors.js"

// with 3 skulls
{
  const actual = markScoreAllowedSelector({
    rollIndex: 0,
    card: CARD_ANIMALS,
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    scoreMarked: false,
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
  })
  const expected = false
  assert({ actual, expected })
}
