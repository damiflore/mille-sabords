import { assert } from "@jsenv/assert"
import { useRollDiceAllowed } from "src/game.selectors.js"
import { createCoinFromDice } from "src/test/test.material.js"

// card not drawn
{
  const actual = useRollDiceAllowed({
    cardDrawn: false,
    rollIndex: -1,
    diceRolled: [],
    scoreMarked: false,
    hasDicesToCurse: false,
    threeSkullsOrMoreInCursedArea: false,
  })
  const expected = false
  assert({ actual, expected })
}

// dice never rolled
{
  const actual = useRollDiceAllowed({
    cardDrawn: true,
    rollIndex: -1,
    diceRolled: [],
    scoreMarked: false,
    hasDicesToCurse: false,
    threeSkullsOrMoreInCursedArea: false,
  })
  const expected = true
  assert({ actual, expected })
}

// skulls in rolled area
{
  const actual = useRollDiceAllowed({
    cardDrawn: true,
    rollIndex: 0,
    diceRolled: [],
    scoreMarked: false,
    hasDicesToCurse: true,
    threeSkullsOrMoreInCursedArea: false,
  })
  const expected = false
  assert({ actual, expected })
}

// not enough dice to roll
{
  const actual = useRollDiceAllowed({
    cardDrawn: true,
    rollIndex: 0,
    diceRolled: [createCoinFromDice()],
    scoreMarked: false,
    hasDicesToCurse: false,
    threeSkullsOrMoreInCursedArea: false,
  })
  const expected = false
  assert({ actual, expected })
}

// too many skulls
{
  const actual = useRollDiceAllowed({
    cardDrawn: true,
    rollIndex: 0,
    diceRolled: [createCoinFromDice(), createCoinFromDice()],
    scoreMarked: false,
    hasDicesToCurse: false,
    threeSkullsOrMoreInCursedArea: true,
  })
  const expected = false
  assert({ actual, expected })
}
