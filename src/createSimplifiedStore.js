import React from "react"

const { createContext, useContext, useReducer, useEffect } = React

export const createSimplifiedStore = (defaultState, { init = (state) => state, effect } = {}) => {
  const StateContext = createContext(null)
  const DispatchContext = createContext(null)

  const reducer = (state, action) => action.reducer(state, ...action.args)

  const useState = () => useContext(StateContext)

  const useDispatch = () => useContext(DispatchContext)

  // le fait que les actions n'ont pas de type
  // fait qu'on ne peut pas vraiment les enregistrer et les rejouer
  // il serait possible de faire ça en enregistrant chaque action avec un nom
  // et en mettant le reducer a part pour ne garder que la donnée
  // dans ce cas il faudrait passer un nom pour l'action mais bon
  // pas pour le moment
  const createAction = (actionReducer) => createStoreAction({ useDispatch }, actionReducer)

  const ContextProvider = ({ initialState, children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState, () => init(defaultState))

    if (effect) {
      useEffect(() => effect(state), [state])
    }

    useEffect(() => {
      if (!initialState) return
      dispatch(
        {
          reducer: (state) => {
            return { ...state, ...initialState }
          },
          args: [],
        },
        [initialState],
      )
    }, [initialState])

    return (
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </DispatchContext.Provider>
    )
  }

  return {
    createAction,
    useState,
    useDispatch,
    ContextProvider,
  }
}

export const createStoreAction = (store, actionReducer) => {
  return (dispatch = store.useDispatch()) => {
    return (...args) => {
      dispatch({
        reducer: actionReducer,
        args,
      })
    }
  }
}
