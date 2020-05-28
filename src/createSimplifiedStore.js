import React from "react"

const { createContext, useContext, useReducer, useEffect } = React

export const createSimplifiedStore = (defaultState, { init = (state) => state, effect } = {}) => {
  const StateContext = createContext(null)
  const DispatchContext = createContext(null)

  const reducer = (state, action) => action(state)

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
      dispatch((state) => {
        return { ...state, ...initialState }
      })
    }, [initialState])

    /**
    IN CASE OF PERF ISSUE BECAUSE TOO MUCH RERENDER:

    checkout https://github.com/facebook/react/issues/15156#issuecomment-474590693

    And just wrap the part that can be memoized into useMemo so that
    it gets rerendered only if a part of the state changes.
    It means the functionnal component must declare all self state dependencies and wrap the expensive
    part with useMemo

    React keep trying to render component children even if this one is memoized as shown
    in test-manual/rerender/

--- BEFORE ---
```js
const Button = () => {
  const theme = useContext(ThemeContext);
  return <ExpensiveTree className={theme} />;
}
```

--- AFTER ---
```js
const Button = () => {
  const theme = useContext(ThemeContext);
  return useMemo(() => {
    return <ExpensiveTree className={theme} />;
  }, [theme])
}
```
    */

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
      dispatch((state) => actionReducer(state, ...args))
    }
  }
}
