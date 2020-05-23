import React from "react"

const { createContext, useReducer: useReducerReact, useContext } = React

export const createSimplifiedStore = () => {
  const StateContext = createContext(null)
  const DispatchContext = createContext(null)

  const reducer = (state, action) => action.reducer(state, ...action.args)

  const useReducer = (initialValue, init) => useReducerReact(reducer, initialValue, init)

  const useState = () => useContext(StateContext)

  const useDispatch = () => useContext(DispatchContext)

  // le fait que les actions n'ont pas de type
  // fait qu'on ne peut pas vraiment les enregistrer et les rejouer
  // il serait possible de faire ça en enregistrant chaque action avec un nom
  // et en mettant le reducer a part pour ne garder que la donnée
  // dans ce cas il faudrait passer un nom pour l'action mais bon
  // pas pour le moment
  const createAction = (actionReducer) => createStoreAction({ useDispatch }, actionReducer)

  return {
    createAction,
    useReducer,
    useState,
    useDispatch,
    StateContext,
    DispatchContext,
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
