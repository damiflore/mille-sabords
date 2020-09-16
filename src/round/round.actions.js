import { createAction } from "src/main.store.js"

export const useMarkScore = createAction((state, score) => {
  const { players, currentPlayerId } = state
  const currentPlayer = players.find(({ id }) => id === currentPlayerId)
  const nextScore = currentPlayer.score + score
  currentPlayer.score = nextScore < 0 ? 0 : nextScore

  return {
    ...state,
    players: [...players],
    scoreMarked: true,
  }
})

export const useSendToSkullIsland = createAction((state) => {
  return {
    ...state,
    isOnSkullIsland: true,
  }
})

export const useStartRound = createAction((state) => {
  return {
    ...state,
    roundStarted: true,
  }
})
