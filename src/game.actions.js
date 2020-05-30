import { createGameAction } from "src/game.store.js"



export const useMarkScore = createGameAction((state, score) => {
  const { totalScore } = state
  return {
    ...state,
    totalScore: Math.max(totalScore + score, 0),
    scoreMarked: true,
  }
})

export const useSendToSkullIsland = createGameAction((state) => {
  return {
    ...state,
    isOnSkullIsland: true,
  }
})
