import React from "react"
import ReactDOM from "react-dom"

const { useReducer, createContext, useContext } = React

const createContextForReducerStatic = (reducer, initialValue) => {
  // const StateContext = createContext()
  const StateContextMap = {
    count: createContext(),
  }
  const DispatchContext = createContext()

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValue)

    const CountProvider = StateContextMap.count.Provider

    const DispatchProvider = DispatchContext.Provider

    return [CountProvider, DispatchProvider].reduce((element, Provider) => {
      const value = Provider === CountProvider ? state.count : dispatch
      return <Provider value={value}>{element}</Provider>
    }, children)
  }

  return {
    Provider,
    useKeyedState: (key) => useContext(StateContextMap[key]),
    useDispatch: () => useContext(DispatchContext),
  }
}

const reducerContext = createContextForReducerStatic(
  (state, action) => {
    return action(state)
  },
  { count: 0 },
)

function Button() {
  console.log("render button")
  const dispatch = reducerContext.useDispatch()
  const increment = () =>
    dispatch((state) => {
      const { count } = state
      return {
        ...state,
        count: count + 1,
      }
    })
  return <button onClick={increment}>+</button>
}

function Count() {
  console.log("render count")
  const count = reducerContext.useKeyedState("count")
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
