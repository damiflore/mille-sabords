import { createAction } from "src/main.store.js"

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
