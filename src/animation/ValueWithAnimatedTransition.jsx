import { useAnimateTransitionUsingJs } from "./useAnimateTransition.js"

export const ValueWithAnimatedTransition = ({ value, duration }) => {
  const animatedValue = useAnimateTransitionUsingJs(value, { duration })
  return animatedValue ? animatedValue.value : value
}
