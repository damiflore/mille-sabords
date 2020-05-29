/**

https://github.com/diegohaz/constate/blob/633f7f75a2e30f3ee036645d9e09f6026c734a77/src/index.tsx#L83

*/

import React from "react"

const { createContext, useContext, useReducer, useEffect } = React

export const createStructuredStateStore = (
  defaultState,
  init,
  { name = "global", effect = () => {} } = {},
) => {
  const StateContextMap = {}
  Object.keys(defaultState).forEach((key) => {
    // we could pass defaultState[key], we don't really need the check on wrapped by provider or not
    // because we control that (we are passing the provider ourselves)
    const KeyedStateContext = createContext(defaultState[key])
    StateContextMap[key] = KeyedStateContext
    KeyedStateContext.Provider.displayName = `${name}.state.${key}.Provider`
  })
  const DispatchContext = createContext(null)

  const reducer = (state, action) => action(state)

  let getStateInternal = () => defaultState

  // to be able to getState from outside react
  const getState = () => getStateInternal()

  const Provider = ({ initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState, init)
    getStateInternal = () => state

    useEffect(() => {
      if (!initialState) return
      dispatch((state) => {
        return { ...state, ...initialState }
      })
    }, [initialState])
    useEffect(() => {
      if (effect) effect(state)
    }, [state])

    const DispatchProvider = DispatchContext.Provider
    DispatchProvider.displayName = `${name}.dispatch.Provider`

    // nested provider info: https://github.com/facebook/react/issues/14620
    const element = <DispatchProvider value={dispatch}>{children}</DispatchProvider>
    return Object.keys(defaultState).reduce((element, key) => {
      const KeyedStateProvider = StateContextMap[key].Provider
      return <KeyedStateProvider value={state[key]}>{element}</KeyedStateProvider>
    }, element)
  }

  const useState = () => getState()

  const useKeyedState = (key) => useContext(StateContextMap[key])

  const useDispatch = () => useContext(DispatchContext)

  const createAction = (actionReducer) => {
    return () => {
      const dispatch = useDispatch()
      return (...args) => {
        dispatch((state) => actionReducer(state, ...args))
      }
    }
  }

  return {
    Provider,
    useKeyedState,
    useDispatch,
    createAction,

    // in theory should not be used but could be handy ?
    useState,
    getState,
  }
}
