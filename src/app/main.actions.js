import { createAction, defaultState } from "root/src/app/main.store.js"

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

export const useCancelGame = createAction(() => {
  return defaultState
})
