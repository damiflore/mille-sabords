import { isWitchCard } from "src/Cards/cards.js"
import { SYMBOL_SKULL } from "src/constants.js"

export const unkeepDice = (
  {
    card,
    diceKept,
    setCardEffectUsed,
    diceCursed,
    setDiceCursed,
    setDiceKept,
    diceInGame,
    setDiceInGame,
  },
  dice,
) => {
  if (dice.symbol === SYMBOL_SKULL) {
    if (isWitchCard(card)) {
      setCardEffectUsed(true)
    }
    const cursedArrayWithoutThisDice = diceCursed.filter((diceCandidate) => diceCandidate !== dice)
    setDiceCursed(cursedArrayWithoutThisDice)
  } else {
    const keptArrayWithoutThisDice = diceKept.filter((diceCandidate) => diceCandidate !== dice)
    setDiceKept(keptArrayWithoutThisDice)
  }

  const inGameArrayWithThisDice = [...diceInGame, dice]
  setDiceInGame(inGameArrayWithThisDice)
}

export const markScore = ({ setTotalScore, totalScore, setScoreMarked }, score) => {
  setTotalScore(Math.max(totalScore + score, 0))
  setScoreMarked(true)
}
