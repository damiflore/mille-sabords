import React from "react"
import ReactDOM from "react-dom"

const { useReducer, createContext, useContext } = React

const createContextForReducer = (reducer, initialValue) => {
  const StateContext = createContext()
  const DispatchContext = createContext()

  const Provider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialValue)
    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
      </StateContext.Provider>
    )
  }

  return {
    Provider,
    useState: () => useContext(StateContext),
    useDispatch: () => useContext(DispatchContext),
  }
}

const reducerContext = createContextForReducer((state, action) => {
  return action(state)
}, 0)

function Button() {
  console.log("render button")
  const dispatch = reducerContext.useDispatch()
  const increment = () =>
    dispatch((state) => {
      return state + 1
    })
  return <button onClick={increment}>+</button>
}

function Count() {
  console.log("render count")
  const count = reducerContext.useState()
  return <span>{count}</span>
}

function App() {
  return (
    <reducerContext.Provider>
      <Count />
      <Button />
    </reducerContext.Provider>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))
