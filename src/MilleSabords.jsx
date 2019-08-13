import React from "react"

export const MilleSabords = () => {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>Cliquez ici</button>
    </div>
  )
}
