import React from "react"
import ReactDOM from "react-dom"

const { createContext, useContext, useState, useMemo } = React

const MyContext = createContext()

const GrandchildComponent = () => {
  const value = useContext(MyContext)
  return <div>{value.a}</div>
}

const ChildComponent = () => {
  // this will happen only once and when not memoized
  console.log("render child")
  return <GrandchildComponent />
}

const WithoutMemo = () => {
  const [a, setA] = useState(0)

  const contextValue = { a }

  return (
    <MyContext.Provider value={contextValue}>
      <ChildComponent />
      <button
        onClick={() => {
          setA(42)
        }}
      >
        updateA
      </button>
    </MyContext.Provider>
  )
}

const MemoizedChildComponent = React.memo(ChildComponent)

const WithMemo = () => {
  const [a, setA] = useState(0)
  const contextValue = { a }

  return (
    <MyContext.Provider value={contextValue}>
      <MemoizedChildComponent />
      <button
        onClick={() => {
          setA(42)
        }}
      >
        updateA
      </button>
    </MyContext.Provider>
  )
}

const ChildComponentWithUseMemo = () => {
  const { whatever } = useContext(MyContext)
  return useMemo(ChildComponent, [whatever])
}

const WithUseMemo = () => {
  const [a, setA] = useState(0)
  const contextValue = { a, whatever: true }

  return (
    <MyContext.Provider value={contextValue}>
      <ChildComponentWithUseMemo />
      <button
        onClick={() => {
          setA(42)
        }}
      >
        updateA
      </button>
    </MyContext.Provider>
  )
}

const App = () => {
  return (
    <>
      <WithoutMemo />
      <WithMemo />
      <WithUseMemo />
    </>
  )
}

ReactDOM.render(<App />, document.querySelector("#mille-sabord-container"))
