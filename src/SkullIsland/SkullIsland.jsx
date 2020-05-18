import React from "react"
import { Dice } from "../Dice/Dice.jsx"

export const SkullIsland = ({ diceCursed, canRemoveSkull, removeSkull }) => {
  const showSkullIsland = (element) => {
    element.setAttribute("data-skullIsland-visible", "")
  }
  const hideSkullIsland = (element) => {
    element.removeAttribute("data-skullIsland-visible")
  }

  return (
    <div className="skullIsland-wrapper">
      <div
        onClick={() => showSkullIsland(document.querySelector(".skullIsland"))}
        className="skullIsland-trigger"
      >
        <span>{diceCursed.length}</span>
      </div>
      <div className="skullIsland">
        <div className="map">
          <span
            className="skullIsland-close"
            onClick={() => hideSkullIsland(document.querySelector(".skullIsland"))}
          >
            X
          </span>
          <div className="area">
            {diceCursed.map((dice) => (
              <Dice
                key={dice.id}
                dice={dice}
                disabled={!canRemoveSkull}
                onClickAction={removeSkull}
                specificStyle={{ margin: "5px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
