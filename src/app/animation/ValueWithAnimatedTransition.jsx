import { useAnimateTransitionUsingJs } from "./useAnimateTransition.js"

export const ValueWithAnimatedTransition = ({ value, duration, condition }) => {
  const animatedValue = useAnimateTransitionUsingJs(value, {
    duration,
    condition,
  })
  return animatedValue ? animatedValue.value : value
}
