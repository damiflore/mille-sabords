import React from "react"
import ReactDOM from "react-dom"

const { useReducer, createContext, useContext } = React

const StateContext = createContext(null)
const ActionsContext = createContext(null)

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

  const actions = {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  }

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>
        <Counter />
      </StateContext.Provider>
    </ActionsContext.Provider>
  )
}

const Counter = () => {
  const { count } = useContext(StateContext)
  const { increment, decrement } = useContext(ActionsContext)
  return (
    <>
      <Total count={count} />
      <Button action={decrement}>-</Button>
      <Button action={increment}>+</Button>
    </>
  )
}

const Total = ({ count }) => {
  return <>Total : {count} </>
}

const Button = ({ action, children }) => {
  return <button onClick={action}>{children}</button>
}

ReactDOM.render(<App />, document.body)
