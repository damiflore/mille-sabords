import React from "react"

const { useEffect, useRef } = React

// https://stackoverflow.com/a/61680184/2634179
export const useBecomes = (callback, deps) => {
  const mountedRef = useRef(false)
  useEffect(() => {
    if (mountedRef.current === false) {
      mountedRef.current = true
    }
  })

  const depsRef = useRef(deps)
  useEffect(() => {
    depsRef.current = deps
  }, deps)

  return mountedRef.current ? Boolean(callback(...depsRef.current)) : false
}

export const usePrevious = (value) => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}
