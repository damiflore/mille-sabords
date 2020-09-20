import React from "react"

import { useCurrentCard } from "src/main.store.js"

import { cardsRules } from "src/cards/cards-rules.js"
import { Dialog } from "src/dialog/Dialog.jsx"

export const CardRulesDialog = ({ dialogIsOpen, closeDialog }) => {
  const card = useCurrentCard()

  return (
    <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={true}>
      <div className="border border-right"></div>
      <div className="border border-left"></div>
      <div className="border border-top"></div>
      <div className="border border-bottom"></div>

      <div className="dialog-title">Carte</div>

      <div className="dialog-content card-rules-dialog">
        <div className="dialog-body">
          {cardsRules[card] && (
            <>
              <div className="dialog-label">{cardsRules[card].name}</div>
              <img className="current-card" src={`/src/cards/card_${card}.png`} alt={card} />
              <div className="text-rule">{cardsRules[card].rule}</div>
              {cardsRules[card].more ? (
                <div className="text-rule">{cardsRules[card].more}</div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </Dialog>
  )
}
