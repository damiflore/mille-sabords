import React from "react"

const { createContext, useContext, useState } = React

const DragDiceGestureContext = createContext()

export const useDragDiceGesture = () => useContext(DragDiceGestureContext)[0]

export const useDragDiceGestureSetter = () => useContext(DragDiceGestureContext)[1]

export const DragDiceGestureProvider = ({ children }) => {
  return (
    <DragDiceGestureContext.Provider value={useState()}>{children}</DragDiceGestureContext.Provider>
  )
}
