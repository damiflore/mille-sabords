import { assert } from "@jsenv/assert"
import { useRollDiceAllowed } from "src/game.selectors.js"
import { createDiceOnCoin } from "src/test/test.material.js"

// card not drawn
{
  const actual = useRollDiceAllowed({
    cardDrawn: false,
    rollIndex: -1,
    diceRolled: [],
    scoreMarked: false,
    hasSkullsInRolledArea: false,
    threeSkullOrMoreInCursedArea: false,
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
    hasSkullsInRolledArea: false,
    threeSkullOrMoreInCursedArea: false,
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
    hasSkullsInRolledArea: true,
    threeSkullOrMoreInCursedArea: false,
  })
  const expected = false
  assert({ actual, expected })
}

// not enough dice to roll
{
  const actual = useRollDiceAllowed({
    cardDrawn: true,
    rollIndex: 0,
    diceRolled: [createDiceOnCoin()],
    scoreMarked: false,
    hasSkullsInRolledArea: false,
    threeSkullOrMoreInCursedArea: false,
  })
  const expected = false
  assert({ actual, expected })
}

// too many skulls
{
  const actual = useRollDiceAllowed({
    cardDrawn: true,
    rollIndex: 0,
    diceRolled: [createDiceOnCoin(), createDiceOnCoin()],
    scoreMarked: false,
    hasSkullsInRolledArea: false,
    threeSkullOrMoreInCursedArea: true,
  })
  const expected = false
  assert({ actual, expected })
}
