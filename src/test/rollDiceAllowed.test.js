import { assert } from "@jsenv/assert"
import { rollDiceAllowedSelector } from "src/game.selectors.js"
import { SYMBOL_SKULL, CARD_TWO_SKULLS, CARD_ONE_SKULL } from "src/constants.js"

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
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from the card
    ],
    diceRolled: [{ symbol: SYMBOL_SKULL }],
    rollIndex: 0,
  })
  const expected = false
  assert({ actual, expected })
}

// skulls in rolled area (but uncursed by witch)
{
  const skullDice = { id: 1, symbol: SYMBOL_SKULL }
  const actual = rollDiceAllowedSelector({
    cardDrawn: true,
    scoreMarked: false,
    card: CARD_TWO_SKULLS,
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from the card
      { symbol: SYMBOL_SKULL }, // from the card
    ],
    diceRolled: [skullDice, {}],
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
    diceCursed: [
      { symbol: SYMBOL_SKULL }, // from the card
      { symbol: SYMBOL_SKULL }, // from the card
    ],
    rollIndex: 0,
    diceRolled: [0],
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
      { symbol: SYMBOL_SKULL }, // from the card
      { symbol: SYMBOL_SKULL }, // from the card
      { symbol: SYMBOL_SKULL },
    ],
  })
  const expected = false
  assert({ actual, expected })
}
