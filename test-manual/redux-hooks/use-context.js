import React from "react"
import ReactDOM from "react-dom"

const { useReducer, createContext, useContext } = React

const StateContext = createContext(null)
const DispatchContext = createContext(null)

const App = () => {
  const initialState = { count: 0 }

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 }
      case "decrement":
        return { count: state.count - 1 }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Counter />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

const Counter = () => {
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  return (
    <>
      Total : {state.count}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  )
}

ReactDOM.render(<App />, document.body)
