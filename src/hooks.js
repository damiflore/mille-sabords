import React from "react"

const { useState, useEffect, useRef } = React

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

const gameRessourceMap = new Map()
// ça marche pas vraiment parce que on peut appeler plusieurs fois cette fonction, ce qui créé
// autant de useState non ?
export const useGameRessourceLoaded = (url) => {
  // console.log("track game ressource loading", url)
  const [loaded, loadedSetter] = useState(false)

  gameRessourceMap.set(url, loaded)

  return (value) => {
    // console.log("game ressource loaded", url)
    loadedSetter(value)
  }
}
export const useAllGameRessourceLoaded = async () => {
  console.log("number of node loading", gameRessourceMap.size)
  return Array.from(gameRessourceMap.values()).every((loaded) => loaded)
}
