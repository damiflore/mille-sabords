import { assert } from "@jsenv/assert"
import { useRollDiceAllowed } from "src/game.selectors.js"
import { CARD_COIN } from "src/cards/cards.js"
import { createCoinFromDice } from "./test.material.js"

// card not drawn
{
  const actual = useRollDiceAllowed({
    currentCard: null,
    hasNeverRolled: true,
    dicesRolled: [],
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
    currentCard: CARD_COIN,
    hasNeverRolled: true,
    dicesRolled: [],
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
    currentCard: CARD_COIN,
    hasNeverRolled: false,
    dicesRolled: [],
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
    currentCard: CARD_COIN,
    hasNeverRolled: false,
    dicesRolled: [createCoinFromDice()],
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
    currentCard: CARD_COIN,
    hasNeverRolled: false,
    dicesRolled: [createCoinFromDice(), createCoinFromDice()],
    scoreMarked: false,
    hasDicesToCurse: false,
    threeSkullsOrMoreInCursedArea: true,
  })
  const expected = false
  assert({ actual, expected })
}
