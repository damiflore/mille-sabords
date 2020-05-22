/**

https://github.com/donavon/use-persisted-state/blob/develop/src/usePersistedState.js#L1
https://joshwcomeau.com/react/persisting-react-state-in-localstorage/
https://usehooks.com/useLocalStorage/

*/

import React from "react"
import { createLogger } from "@jsenv/logger"

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

export const useStateWithSessionStorage = (
  initialValue,
  sessionStorageKey,
  { logLevel = "warn" } = {},
) => {
  const logger = createLogger({ logLevel })
  const [value, setValue] = useState(() => {
    if (sessionStorage.hasOwnProperty(sessionStorageKey)) {
      const valueFromSessionStorage = JSON.parse(sessionStorage.getItem(sessionStorageKey))
      logger.debug(`read sessionStorage ${sessionStorageKey} = `, valueFromSessionStorage)
      return valueFromSessionStorage
    }
    logger.debug(`sessionStorage has nothing for ${sessionStorageKey}`)
    return initialValue
  })

  useEffect(() => {
    logger.debug(`write sessionStorage ${sessionStorageKey} = `, value)
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
    structuredSetters[actionType] = (newValue) => {
      setValue(newValue)

      /*
       without this if we would update structured state even if the value did not change
       meaning react would consider it has changed
       and it would be rewritten to sessionStorage.

       We don't put this if around setValue above because I guess
       it's a feature of react that if you call setValue(currentValue)
       the component is rerendered even if the value is the same
      */
      if (newValue !== value) {
        const nextStructuredState = { ...currentStructuredState, [key]: newValue }
        currentStructuredState = nextStructuredState
        setStructuredState(currentStructuredState)
        return
      }
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
