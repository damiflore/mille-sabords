export const markScore = ({ setTotalScore, totalScore, roundScore, setScoreMarked }) => {
  setTotalScore(Math.max(totalScore + roundScore, 0))
  setScoreMarked(true)
}
