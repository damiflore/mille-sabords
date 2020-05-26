import { assert } from "@jsenv/assert"
import { SYMBOL_SKULL, CARD_ANIMALS } from "src/constants.js"
import { startNextRoundAllowedSelector } from "src/game.selectors.js"

// dice not rolled one
{
  const actual = startNextRoundAllowedSelector({
    rollIndex: -1,
  })
  const expected = false
  assert({ actual, expected })
}

// round ongoing (can roll dice or mark score)
{
  const actual = startNextRoundAllowedSelector({
    rollIndex: 2,
    diceCursed: [],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = false
  assert({ actual, expected })
}

// skull in rolled area ( = cursed animation ongoing)
{
  const actual = startNextRoundAllowedSelector({
    rollIndex: 0,
    card: CARD_ANIMALS,
    diceCursed: [],
    scoreMarked: false,
    diceRolled: [{ symbol: SYMBOL_SKULL, id: 12 }],
  })
  const expected = false
  assert({ actual, expected })
}

// round finished: score is marked
{
  const actual = startNextRoundAllowedSelector({
    rollIndex: 3,
    card: CARD_ANIMALS,
    diceCursed: [],
    scoreMarked: true,
    diceRolled: [],
  })
  const expected = true
  assert({ actual, expected })
}

// round finished: has 3 skulls
{
  const actual = startNextRoundAllowedSelector({
    rollIndex: 3,
    card: CARD_ANIMALS,
    diceCursed: [{ symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }, { symbol: SYMBOL_SKULL }],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = true
  assert({ actual, expected })
}
