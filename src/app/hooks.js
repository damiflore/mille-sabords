import React from "react"

export const useMountEffect = (effect) => {
  React.useEffect(effect, [])
}

export const useUpdateEffect = (
  effect,
  dependencies = [],
  { layout = false } = {},
) => {
  const isInitialMount = React.useRef(true)
  ;(layout ? React.useLayoutEffect : React.useEffect)(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return undefined
    }

    return effect()
  }, dependencies)
}

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
