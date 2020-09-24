import React from "react"

import { useCurrentCardId } from "src/main.store.js"
import { cardIdToCard } from "src/cards/cards.js"

import { cardsRules } from "src/cards/cards-rules.js"
import { Dialog } from "src/dialog/Dialog.jsx"

export const CardRulesDialog = ({ dialogIsOpen, closeDialog }) => {
  const card = cardIdToCard(useCurrentCardId())
  const cardRules = cardsRules[card.type]

  return (
    <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={true}>
      <div className="border border-right"></div>
      <div className="border border-left"></div>
      <div className="border border-top"></div>
      <div className="border border-bottom"></div>

      <div className="dialog-title">Carte</div>

      <div className="dialog-content card-rules-dialog">
        <div className="dialog-body">
          {cardRules && (
            <>
              <div className="dialog-label">{cardRules.name}</div>
              <img
                className="current-card"
                src={`/src/cards/card_${card.type}.png`}
                alt={card.type}
              />
              <div className="text-rule">{cardRules.rule}</div>
              {cardRules.more ? <div className="text-rule">{cardRules.more}</div> : null}
            </>
          )}
        </div>
      </div>
    </Dialog>
  )
}
