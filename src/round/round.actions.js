import { createAction } from "src/main.store.js"

export const useStartPlayerRound = createAction((state, player) => {
  return {
    ...state,
    currentPlayerId: player.id,
    currentCardId: null,
    roundStarted: true,
  }
})

export const useActivateCurrentCard = createAction((state) => {
  return {
    ...state,
    currentCardActivated: true,
    ...ROUND_START_STATE,
  }
})

export const useSendToSkullIsland = createAction((state) => {
  return {
    ...state,
    isOnSkullIsland: true,
  }
})

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

export const useResetRound = createAction((state) => {
  return {
    ...state,
    ...ROUND_START_STATE,
  }
})

export const useEndPlayerRound = createAction((state) => {
  return {
    ...state,
    roundStarted: false,
  }
})

const ROUND_START_STATE = {
  witchUncursedDiceId: null,
  rollCount: 0,
  diceRolledIds: [],
  diceCursedIds: [],
  chestSlots: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  },
  scoreMarked: false,
  isOnSkullIsland: false,
}
