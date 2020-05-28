import { assert } from "@jsenv/assert"
import { CARD_ANIMALS } from "src/cards/cards.js"
import { startNextRoundAllowedSelector } from "src/game.selectors.js"
import { createDiceOnSkull } from "src/test/test.material.js"

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
    diceRolled: [createDiceOnSkull()],
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
    diceCursed: [createDiceOnSkull(), createDiceOnSkull(), createDiceOnSkull()],
    scoreMarked: false,
    diceRolled: [],
  })
  const expected = true
  assert({ actual, expected })
}

// round finished: has 3 skulls + one remaining in rolled area
{
  const actual = startNextRoundAllowedSelector({
    rollIndex: 3,
    card: CARD_ANIMALS,
    diceCursed: [createDiceOnSkull(), createDiceOnSkull(), createDiceOnSkull()],
    scoreMarked: false,
    diceRolled: [createDiceOnSkull()],
  })
  const expected = true
  assert({ actual, expected })
}