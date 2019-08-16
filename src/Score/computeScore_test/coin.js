import { assert } from "@dmail/assert"
import { computeScore } from "../ScoreHelpers.js"

// with nothing
{
  const actual = computeScore({
    currentCard: { type: "coin" },
    diceKept: ["sword", "sword", "parrot", "parrot", "monkey", "monkey", "skull", "skull"],
  })
  const expected = 100
  assert({ actual, expected })
}

// with 7 coin + 1 parrot
{
  const actual = computeScore({
    currentCard: { type: "coin" },
    diceKept: ["coin", "coin", "coin", "coin", "coin", "coin", "coin", "parrot"],
  })
  // 4000 from "8 identic symbols"
  // 800 from "coin = 100"
  // -> 4800
  const expected = 4800
  assert({ actual, expected })
}
