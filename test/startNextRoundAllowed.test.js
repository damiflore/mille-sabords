import { assert } from "@jsenv/assert"
import { useStartNextRoundAllowed } from "src/game.selectors.js"

// round ongoing because can roll dice
{
  const actual = useStartNextRoundAllowed({
    rollDiceAllowed: true,
    markScoreAllowed: false,
    hasDicesToCurse: false,
  })
  const expected = false
  assert({ actual, expected })
}

// round ongoing because can mark score
{
  const actual = useStartNextRoundAllowed({
    rollDiceAllowed: false,
    markScoreAllowed: true,
    hasDicesToCurse: false,
  })
  const expected = false
  assert({ actual, expected })
}

// round on going because dices are being cursed
{
  const actual = useStartNextRoundAllowed({
    rollDiceAllowed: false,
    markScoreAllowed: false,
    hasDicesToCurse: true,
  })
  const expected = false
  assert({ actual, expected })
}

// round finished (cannot mark score or roll dices)
{
  const actual = useStartNextRoundAllowed({
    rollDiceAllowed: false,
    markScoreAllowed: false,
    hasDicesToCurse: false,
  })
  const expected = true
  assert({ actual, expected })
}
