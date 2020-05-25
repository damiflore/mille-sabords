import React from "react"

const { useEffect, useRef, useState } = React

export const usePrevious = (value) => {
  const ref = useRef()
  ref.current = value
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

// https://stackoverflow.com/a/61680184/2634179
export const useBecomes = (callback, deps) => {
  const [becomes, setBecomes] = useState(false)

  const argsRef = useRef(null)
  useEffect(() => {
    if (argsRef.current !== null) {
      const returnValue = callback(...argsRef.current)
      if (returnValue) {
        // tell outside it becomes true
        setBecomes(true)
        // immediatly reset to false
        setBecomes(false)
      }
    }
    argsRef.current = deps
  }, deps)

  return becomes
}
