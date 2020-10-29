import React from "react"
import { useUndrawCard } from "src/cards/cards.actions.js"

export const StartRoundLab = () => {
  const undrawCard = useUndrawCard()
  return (
    <>
      {`TODO: allow to change the current card`}
      <button onClick={undrawCard}>Annuler la pioche</button>
    </>
  )
}
