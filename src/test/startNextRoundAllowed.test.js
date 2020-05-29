import { assert } from "@jsenv/assert"
import { useStartNextRoundAllowed } from "src/game.selectors.js"

// round ongoing because can roll dice
{
  const actual = useStartNextRoundAllowed({
    rollDiceAllowed: true,
    markScoreAllowed: false,
  })
  const expected = false
  assert({ actual, expected })
}

// round ongoing because can mark score
{
  const actual = useStartNextRoundAllowed({
    rollDiceAllowed: false,
    markScoreAllowed: true,
  })
  const expected = false
  assert({ actual, expected })
}

// round finished (cannot mark score or roll dices)
{
  const actual = useStartNextRoundAllowed({
    rollDiceAllowed: false,
    markScoreAllowed: false,
  })
  const expected = true
  assert({ actual, expected })
}
