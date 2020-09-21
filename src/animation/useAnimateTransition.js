import React from "react"
import { usePrevious } from "src/hooks.js"
import { startJavaScriptAnimation } from "./startJavaScriptAnimation.js"

export const useAnimateTransitionUsingJs = (value, { duration = 300, timingFunction } = {}) => {
  const [animatedValue, animatedValueSetter] = React.useState(null)
  useAnimateTransition(value, (from, to) => {
    animatedValueSetter({ value: from })
    return startJavaScriptAnimation({
      duration,
      timingFunction,
      onProgress: ({ progress }) => {
        const value = Math.round(from + (to - from) * progress)
        animatedValueSetter({
          value,
        })
      },
      onComplete: () => {
        animatedValueSetter(null)
      },
    })
  })
  return animatedValue
}

export const useAnimateTransitionUsingWebAnimation = (value, animate) => {
  useAnimateTransition(value, (from, to) => {
    const animation = animate(from, to)
    return () => {
      animation.cancel()
    }
  })
}

const useAnimateTransition = (value, animate) => {
  const [transition, transitionSetter] = React.useState(null)

  const valuePrevious = usePrevious(value)
  React.useEffect(() => {
    if (valuePrevious !== value) {
      transitionSetter({
        from: valuePrevious,
        to: value,
      })
    }
  }, [valuePrevious, value])
  React.useEffect(() => {
    if (transition) {
      return animate(transition.from, transition.to)
    }
    return () => {}
  }, [transition])
}
