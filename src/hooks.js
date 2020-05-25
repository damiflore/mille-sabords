import React from "react"

const { useEffect, useRef } = React

// https://stackoverflow.com/a/61680184/2634179
export const useBecomes = (callback, deps) => {
  const previousDeps = usePrevious(deps)

  const mountedRef = useRef(false)
  useEffect(() => {
    if (mountedRef.current === false) {
      mountedRef.current = true
    }
  })

  return mountedRef.current ? Boolean(callback(...previousDeps)) : false
}

const usePrevious = (value) => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
