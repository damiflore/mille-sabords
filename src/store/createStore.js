import React from "react"

const { createContext, useContext } = React

export const createStore = (value, name = "store") => {
  const Context = createContext(value)
  const ContextProvider = Context.Provider

  const Provider = ({ children }) => {
    return <ContextProvider value={React.useState(value)}>{children}</ContextProvider>
  }
  Provider.displayName = `${name}.Provider`
  const useState = () => useContext(Context)

  return { Provider, useState }
}
