/**

https://github.com/reactjs/rfcs/pull/119
https://github.com/dai-shi/use-context-selector
https://github.com/diegohaz/constate
https://github.com/facebook/react/tree/master/packages/use-subscription

this store sends a getState and dispatch method using context
these methods won't rerender the whole tree

instead every component calling getState
indicate it's interested by the state and gets
re-rendered when it changes

It means all component not calling useState
won't be re-rendered when state changes, a big win

But here is the reality: react detect state context usage anyway
It mean it's already the case with the naive implementation

In other words this implementation provides zero perf boost compare to the naive one
Using memoization it's possible to get eventual required perf boost.

Moreover https://github.com/reactjs/rfcs/pull/119 is being developed
and should provided what we really want: the ability to detect what part of the state
are being read so that the element is re-rendered only if the part of the state it reads
are modified.

Until then we can live with useMemo and wait to see how thing evolves

*/

import React from "react"
import { createSignal } from "./createSignal.js"

const { createContext, useContext, useReducer, useEffect, useRef } = React

export const createStateStore = (defaultState, { init = (state) => state, effect } = {}) => {
  const GetStateContext = createContext(null)
  const DispatchContext = createContext(null)
  let stateValue
  const stateSignal = createSignal()

  const reducer = (state, action) => action(state)

  const getState = () => {
    const [value, setValue] = React.useState(stateValue)
    useEffect(() => {
      return stateSignal.listen(setValue)
    })
    return value
  }

  const ContextProvider = ({ initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState, () => init(defaultState))

    stateValue = state
    const previousStateRef = useRef(state)
    useEffect(() => {
      if (effect) effect(state)
      if (previousStateRef.current !== state) {
        previousStateRef.current = state
        stateSignal.emit(state)
      }
    }, [state])

    useEffect(() => {
      if (!initialState) return
      dispatch((state) => {
        return { ...state, ...initialState }
      })
    }, [initialState])

    return (
      <GetStateContext.Provider value={getState}>
        <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
      </GetStateContext.Provider>
    )
  }

  const useState = () => useContext(GetStateContext)()

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
