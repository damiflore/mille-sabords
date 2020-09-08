import React from "react"

import { getDomNodePageRect } from "src/dom/dom.js"
import { rectangleCollides } from "src/helper/rectangle.js"

import { useCurrentCard, useDicesKept, useDicesRolled, useDragDiceGesture } from "src/game.store.js"
import { useUnkeepDiceAllowed, useThreeSkullsOrMoreInCursedArea } from "src/game.selectors.js"
import { useUnkeepDice, useKeepDice } from "src/dices/dices.actions.js"

import { isCoinCard, isDiamondCard, cardColors } from "src/cards/cards.js"
import { Dice } from "src/dices/Dice.jsx"
import { RoundScore } from "src/score/RoundScore.jsx"
import { diceSize } from "src/dices/dicePosition.js"

const { useState, useEffect } = React

export const DiceKept = () => {
  const dicesKept = useDicesKept()
  const currentCard = useCurrentCard()
  const unkeepDiceAllowed = useUnkeepDiceAllowed()
  const unkeepDice = useUnkeepDice()

  const [diceKeptAreaDomNode, diceKeptAreaDomNodeSetter] = useState(null)
  const dragDiceGesture = useDragDiceGesture()
  const [diceDraggedOver, diceDraggedOverSetter] = useState(false)
  useEffect(() => {
    diceDraggedOverSetter(diceDraggedOverGetter({ dragDiceGesture, diceKeptAreaDomNode }))
  }, [dragDiceGesture, diceKeptAreaDomNode])

  const dicesRolled = useDicesRolled()
  const hoveredByRolledDice = diceDraggedOver && dicesRolled.includes(diceDraggedOver)

  const keepDice = useKeepDice()
  useEffect(() => {
    if (dragDiceGesture) {
      dragDiceGesture.addDropHandler(diceKeptAreaDomNode, () => {
        if (hoveredByRolledDice) {
          keepDice(dragDiceGesture.dice)
        }
      })
    }
  }, [dragDiceGesture, diceKeptAreaDomNode])

  return (
    <div className="dice-kept">
      <div
        className="dice-area"
        ref={diceKeptAreaDomNodeSetter}
        style={{
          ...(hoveredByRolledDice ? { outline: "2px dotted" } : {}),
        }}
      >
        <div className="box">
          {/*
        to get better use experience we should instantiate 9 elements even if the dices are not kept
        these elements would be valid drop target
        so that user can choose to put the dice where he wants in the dice kept area

        beware though because we still want user to drop a dice
        anywhere in the kept area and dice will choose to drop where it intersects most

        to achieve this the most intersecting drop target should win (how to do that remains to be found)
        */}
          {isCoinCard(currentCard) ? <ExtraCoin card={currentCard} /> : null}
          {isDiamondCard(currentCard) ? <ExtraDiamond card={currentCard} /> : null}
          {dicesKept.map((dice) => (
            <Dice
              key={dice.id}
              dice={dice}
              draggable={true}
              clickAllowed={unkeepDiceAllowed}
              onClickAction={(dice) => {
                unkeepDice(dice)
              }}
              specificStyle={{ margin: "5px" }}
            />
          ))}
        </div>
        <div className="top-left-corner"></div>
        <div className="top-right-corner"></div>
        <div className="bottom-left-corner"></div>
        <div className="bottom-right-corner"></div>
        <CursedCover />
      </div>
      <RoundScore />
    </div>
  )
}

const diceDraggedOverGetter = ({ dragDiceGesture, diceKeptAreaDomNode }) => {
  if (!dragDiceGesture) {
    return null
  }
  const diceKeptAreaDomNodeRectangle = getDomNodePageRect(diceKeptAreaDomNode)
  if (!rectangleCollides(dragDiceGesture.diceRect, diceKeptAreaDomNodeRectangle)) {
    return null
  }
  return dragDiceGesture.dice
}

const ExtraCoin = ({ card }) => {
  return (
    <button
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        color: "#fcfcfc",
        margin: "5px",
        backgroundColor: cardColors[card].color1,
        borderColor: cardColors[card].color2,
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <img
        src={`src/dices/dice_coin.png`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  )
}

const ExtraDiamond = ({ card }) => {
  return (
    <button
      className="dice"
      style={{
        width: diceSize,
        height: diceSize,
        color: "#fcfcfc",
        margin: "5px",
        backgroundColor: cardColors[card].color1,
        borderColor: cardColors[card].color2,
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <img
        src={`src/dices/dice_diamond.png`}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </button>
  )
}

const CursedCover = () => {
  const threeSkullsOrMoreInCursedArea = useThreeSkullsOrMoreInCursedArea()

  if (!threeSkullsOrMoreInCursedArea) {
    return null
  }

  return (
    <div className="cursed-cover">
      <img src={`src/dice-kept/cursed-cover.png`} alt="cursed-cover" />
    </div>
  )
}
