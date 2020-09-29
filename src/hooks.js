import React from "react"
import { createSignal } from "src/helper/signal.js"

// https://stackoverflow.com/a/61680184/2634179
export const useBecomes = (becomesPredicate, deps) => {
  const transition = useTransition(becomesPredicate, deps)
  return Boolean(transition)
}

export const useTransition = (transitionPredicate, deps) => {
  const mountedRef = React.useRef(false)
  React.useEffect(() => {
    if (mountedRef.current === false) {
      mountedRef.current = true
    }
  })

  const depsRef = React.useRef(deps)
  React.useEffect(() => {
    depsRef.current = deps
  }, deps)

  if (!mountedRef.current) {
    return null
  }
  if (!transitionPredicate(...depsRef.current)) {
    return null
  }
  return {
    from: depsRef.current,
    to: deps,
  }
}

export const usePrevious = (value) => {
  const ref = React.useRef(value)
  React.useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

export const useSignalEmitter = () => {
  const [signal] = React.useState(() => createSignal())
  return signal
}

export const useSignalListener = (signal) => {
  const [state, stateSetter] = React.useState()
  React.useEffect(() => {
    return signal.listen(stateSetter)
  }, [])
  return state
}
