import { assert } from "@jsenv/assert"
import {
  SYMBOL_SKULL,
  HAS_THREE_SKULLS_OR_MORE,
  CARD_ONE_SKULL,
  CARD_ANIMALS,
  CARD_CHEST,
  CARD_TWO_SKULLS,
} from "src/constants.js"
import { markScorePermissionSelector } from "src/game.selectors.js"

// with 3 skulls
{
  const actual = markScorePermissionSelector({
    rollIndex: 0,
    card: CARD_ANIMALS,
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    scoreMarked: false,
  })
  const expected = {
    allowed: false,
    reason: HAS_THREE_SKULLS_OR_MORE,
  }
  assert({ actual, expected })
}

// no skull and user clicked on "Mark score"
{
  const actual = markScorePermissionSelector({
    rollIndex: 0,
    card: CARD_ANIMALS,
    diceCursed: [],
    scoreMarked: true,
  })
  const expected = {
    allowed: false,
  }
  assert({ actual, expected })
}

// with 3 skulls first roll + chest
{
  const actual = markScorePermissionSelector({
    rollIndex: 0,
    card: CARD_CHEST,
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    scoreMarked: false,
  })
  const expected = {
    allowed: false,
    reason: HAS_THREE_SKULLS_OR_MORE,
  }
  assert({ actual, expected })
}

// with 3 skulls second roll + chest
{
  const actual = markScorePermissionSelector({
    rollIndex: 1,
    card: CARD_CHEST,
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    scoreMarked: false,
  })
  const expected = {
    allowed: true,
  }
  assert({ actual, expected })
}

// less than 3 skulls, not clicked on mark score
{
  const actual = markScorePermissionSelector({
    rollIndex: 1,
    card: CARD_CHEST,
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    scoreMarked: false,
  })
  const expected = {
    allowed: true,
  }
  assert({ actual, expected })
}

// with 2 skulls (dice) + 1 skull (card)
{
  const actual = markScorePermissionSelector({
    rollIndex: 0,
    card: CARD_ONE_SKULL,
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from card
      { symbol: SYMBOL_SKULL },
      { symbol: SYMBOL_SKULL },
    ],
    scoreMarked: false,
  })
  const expected = {
    allowed: false,
    reason: HAS_THREE_SKULLS_OR_MORE,
  }
  assert({ actual, expected })
}

// with 2 skulls (dice) + 2 sull (card) - First roll
{
  const actual = markScorePermissionSelector({
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
  const expected = {
    allowed: false,
    reason: HAS_THREE_SKULLS_OR_MORE,
  }
  assert({ actual, expected })
}

// with 2 skulls (dice) + 2 sull (card) - Second roll
{
  const actual = markScorePermissionSelector({
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
  const expected = {
    allowed: false,
    reason: HAS_THREE_SKULLS_OR_MORE,
  }
  assert({ actual, expected })
}
