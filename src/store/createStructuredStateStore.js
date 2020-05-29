import React from "react"

const { createContext, useContext, useReducer, useEffect } = React

export const createStructuredStateStore = (
  defaultState,
  init,
  { name = "global", effect = () => {} } = {},
) => {
  const ContextMap = {}
  Object.keys(defaultState).forEach((key) => {
    const Context = createContext(defaultState[key])
    ContextMap[key] = Context
    Context.Provider.displayName = `${name}.state.${key}.Provider`
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

    // nested provider info: https://github.com/facebook/react/issues/14620
    const KeyedStateProvider = ({ children }) => {
      return Object.keys(state).reduce((element, key) => {
        const KeyedContext = ContextMap[key]
        const KeyedProvider = KeyedContext.Provider
        return <KeyedProvider value={state[key]}>{element}</KeyedProvider>
      }, children)
    }
    KeyedStateProvider.displayName = `${name}.state.Provider`

    const DispatchProvider = ({ children }) => (
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    )
    DispatchProvider.displayName = `${name}.dispatch.Provider`

    return (
      <DispatchProvider>
        <KeyedStateProvider>{children}</KeyedStateProvider>
      </DispatchProvider>
    )
  }

  const useState = () => getState()

  const useKeyedState = (key) => useContext(ContextMap[key])

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
