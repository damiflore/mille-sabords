import { assert } from "@dmail/assert"
import { computeSymbolsScore } from "../Score/ScoreHelpers.js"

{
  const actual = computeSymbolsScore([
    "coin",
    "coin",
    "coin",
    "diamond",
    "diamond",
    "diamond",
    "skull",
    "skull",
  ])
  const expected = 800
  assert({ actual, expected })
}

{
  const actual = computeSymbolsScore([
    "coin",
    "coin",
    "coin",
    "coin",
    "coin",
    "parrot",
    "parrot",
    "parrot",
  ])
  const expected = 1100
  assert({ actual, expected })
}
