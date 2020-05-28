import React from "react"

const { createContext, useContext, useReducer, useEffect } = React

export const createStateStoreNaive = (defaultState, { init = (state) => state, effect } = {}) => {
  const StateContext = createContext(null)
  const DispatchContext = createContext(null)

  const reducer = (state, action) => action(state)

  const ContextProvider = ({ initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState, () => init(defaultState))

    useEffect(() => {
      if (effect) effect(state)
    }, [state])

    useEffect(() => {
      if (!initialState) return
      dispatch((state) => {
        return { ...state, ...initialState }
      })
    }, [initialState])

    return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
    )
  }

  const useState = () => useContext(StateContext)

  const useDispatch = () => useContext(DispatchContext)

  const createAction = (actionReducer) => createStoreAction({ useDispatch }, actionReducer)

  return {
    ContextProvider,
    useState,
    useDispatch,
    createAction,
  }
}

export const createStoreAction = (store, actionReducer) => {
  return (dispatch = store.useDispatch()) => {
    return (...args) => {
      dispatch((state) => actionReducer(state, ...args))
    }
  }
}
