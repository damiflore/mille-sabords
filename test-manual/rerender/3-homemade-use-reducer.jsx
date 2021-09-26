import React from "react"
import ReactDOM from "react-dom"

const { useReducer, createContext, useContext } = React

const StateContext = createContext()
const DispatchContext = createContext()

const CounterProvider = (props) => {
  const [state, dispatch] = useCounter()

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

function useCounter() {
  const [state, dispatch] = useReducer((state, action) => {
    return action(state)
  }, 0)
  return [state, dispatch]
}

const useCount = () => useContext(StateContext)
const useDispatch = () => useContext(DispatchContext)

function Button() {
  console.log("render button")
  const dispatch = useDispatch()
  const increment = () =>
    dispatch((state) => {
      return state + 1
    })
  return <button onClick={increment}>+</button>
}

function Count() {
  console.log("render count")
  const count = useCount()
  return <span>{count}</span>
}

function App() {
  return (
    <CounterProvider>
      <Count />
      <Button />
    </CounterProvider>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))
