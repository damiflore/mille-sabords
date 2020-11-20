import { createAction } from "src/main.store.js"
import { defaultState } from "src/main.store.js"

export const useDisableAnimations = createAction((state) => {
  return {
    ...state,
    animationsDisabled: true,
  }
})

export const useEnableAnimations = createAction((state) => {
  return {
    ...state,
    animationsDisabled: false,
  }
})

export const useDisableSound = createAction((state) => {
  return {
    ...state,
    soundDisabled: true,
  }
})

export const useEnableSound = createAction((state) => {
  return {
    ...state,
    soundDisabled: false,
  }
})

export const useCancelGame = createAction((state) => {
  return defaultState
})
