import React from "react"

import { GameEffects } from "src/round/round.effects.js"
import { DiceOnGoing } from "src/dice-ongoing/DiceOnGoing.jsx"
import { Chest } from "src/chest/Chest.jsx"
import { Header } from "src/header/Header.jsx"
import { Footer } from "src/footer/Footer.jsx"
import { SkullIsland } from "src/skull-island/SkullIsland.jsx"
import { DiceContainer } from "src/dices/DiceContainer.jsx"

export const Round = ({ openScoreboard, onRoundStart, onRoundOver }) => {
  const rolledAreaRef = React.useRef(null)
  const chestRef = React.useRef(null)
  const cursedAreaRef = React.useRef(null)
  const offscreenRef = React.useRef(null)

  const [diceOverChest, diceOverChestSetter] = React.useState(null)
  const [diceOverRolledArea, diceOverRolledAreaSetter] = React.useState(null)

  React.useEffect(() => {
    onRoundStart()
  }, [])

  return (
    <div className="round-container">
      <GameEffects />
      <Header openScoreboard={openScoreboard} />
      <div className="chest-and-skulls">
        <Chest chestRef={chestRef} diceOverChest={diceOverChest} />
        <SkullIsland cursedAreaRef={cursedAreaRef} />
      </div>
      <DiceOnGoing
        rolledAreaRef={rolledAreaRef}
        offscreenRef={offscreenRef}
        diceOverRolledArea={diceOverRolledArea}
      />
      <Footer onRoundOver={onRoundOver} rolledAreaRef={rolledAreaRef} />
      <DiceContainer
        chestRef={chestRef}
        rolledAreaRef={rolledAreaRef}
        offscreenRef={offscreenRef}
        cursedAreaRef={cursedAreaRef}
        onDiceOverChestChange={diceOverChestSetter}
        onDiceOverRolledAreaChange={diceOverRolledAreaSetter}
      />
    </div>
  )
}
