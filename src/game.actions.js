import { createGameAction } from "src/game.store.js"

export const useMarkScore = createGameAction((state, score) => {
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

export const useSendToSkullIsland = createGameAction((state) => {
  return {
    ...state,
    isOnSkullIsland: true,
  }
})

export const useStartRound = createGameAction((state) => {
  return {
    ...state,
    roundStarted: true,
  }
})
