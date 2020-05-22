/**

https://github.com/donavon/use-persisted-state/blob/develop/src/usePersistedState.js#L1
https://joshwcomeau.com/react/persisting-react-state-in-localstorage/
https://usehooks.com/useLocalStorage/

*/

import React from "react"

const { useState, useEffect } = React

export const useStructuredState = (initialStructuredValue) => {
  const structuredState = {}
  const structuredSetters = {}

  Object.keys(initialStructuredValue).forEach((key) => {
    const [value, setValue] = useState(initialStructuredValue[key])
    structuredState[key] = value

    const actionType = statePropertyNameToSetter(key)
    structuredSetters[actionType] = setValue
  })

  return {
    ...structuredState,
    ...structuredSetters,
  }
}

export const useStateWithSessionStorage = (initialValue, sessionStorageKey) => {
  const [value, setValue] = useState(() => {
    if (sessionStorage.hasOwnProperty(sessionStorageKey)) {
      const valueFromSessionStorage = JSON.parse(sessionStorage.getItem(sessionStorageKey))
      // console.log(`read sessionStorage ${sessionStorageKey} = `, valueFromSessionStorage)
      return valueFromSessionStorage
    }
    // console.log(`sessionStorage has nothing for ${sessionStorageKey}`)
    return initialValue
  })

  useEffect(() => {
    // console.log(`write sessionStorage ${sessionStorageKey} = `, value)
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(value))
  }, [value, sessionStorageKey])

  return [value, setValue]
}

export const useStructuredStateWithSessionStorage = (initialStructuredValue, sessionStorageKey) => {
  const structuredValues = {}
  const structuredSetters = {}

  const [structuredState, setStructuredState] = useStateWithSessionStorage(
    initialStructuredValue,
    sessionStorageKey,
  )

  let currentStructuredState = structuredState
  Object.keys(structuredState).forEach((key) => {
    const [value, setValue] = useState(structuredState[key])
    structuredValues[key] = value

    const actionType = statePropertyNameToSetter(key)
    structuredSetters[actionType] = (value) => {
      setValue(value)
      const nextStructuredState = { ...currentStructuredState, [key]: value }
      currentStructuredState = nextStructuredState
      setStructuredState(currentStructuredState)
    }
  })

  return {
    ...structuredValues,
    ...structuredSetters,
  }
}

const statePropertyNameToSetter = (statePropertyName) => {
  const firstLetter = statePropertyName.slice(0, 1)
  const firstLetterCapitalized = firstLetter.toUpperCase()
  const remainingLetters = statePropertyName.slice(1)
  const setter = `set${firstLetterCapitalized}${remainingLetters}`
  return setter
}
