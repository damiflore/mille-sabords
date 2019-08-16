import { assert } from "@dmail/assert"
import { computeScore } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeScore({
    currentCard: { type: "pirate" },
    diceKept: ["sword", "sword", "parrot", "parrot", "monkey", "monkey", "skull", "skull"],
  })
  const expected = 0
  assert({ actual, expected })
}

// with 3 coin
{
  const actual = computeScore({
    currentCard: { type: "pirate" },
    diceKept: ["coin", "coin", "coin", "monkey", "monkey", "parrot", "parrot", "skull"],
  })
  const expected = 800
  assert({ actual, expected })
}

// with 3 coin + 5 sword
{
  const actual = computeScore({
    currentCard: { type: "pirate" },
    diceKept: ["coin", "coin", "coin", "sword", "sword", "sword", "sword", "sword"],
  })
  // 300 from 3 coins
  // 100 from 3 coins
  // 500 from 5 swords
  // 500 from "perfect" rule
  // x2 from pirate
  // -> 2800
  const expected = 2800
  assert({ actual, expected })
}
