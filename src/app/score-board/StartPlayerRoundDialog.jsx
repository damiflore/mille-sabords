import React from "react"

import { Image } from "root/src/app/generic/Image.jsx"
import { useStartPlayerRound } from "root/src/app/round/round.actions.js"
import { Dialog } from "root/src/app/dialog/dialog.component.jsx"
import { CloseIcon } from "root/src/app/dialog/CloseIcon.jsx"

export const StartPlayerRoundDialog = ({
  closeDialog,
  dialogIsOpen,
  player,
}) => {
  const startPlayerRound = useStartPlayerRound()
  return (
    <Dialog
      className="score-board-dialog dialog-spacing-10 dialog-spacing-fluid dialog-spacing-left-fixed dialog-spacing-right-fixed"
      isOpen={dialogIsOpen}
      onRequestClose={closeDialog}
      requestCloseOnClickOutside={true}
    >
      <div className="dialog-content">
        <div className="dialog-close" onClick={closeDialog}>
          <CloseIcon />
        </div>
        <div className="dialog-body">
          <div>
            Au tour de
            <div className="dialog-label">{player.character.name}</div>
            <Image
              className="player-img"
              src={player && player.character.img}
              alt="player"
              width="40"
              height="40"
              style={{
                boxShadow: `inset 0px 0px 0px 4px ${
                  (player && player.character.color) || "black"
                }`,
              }}
            />
          </div>
          <div className="dialog-actions">
            <button
              onClick={() => {
                closeDialog()
                startPlayerRound(player)
              }}
            >
              Jouer
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
