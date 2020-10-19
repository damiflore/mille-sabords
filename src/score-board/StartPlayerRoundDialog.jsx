import React from "react"
import { createAction } from "src/main.store.js"
import { useStartPlaying } from "src/game/Game.jsx"
import { Dialog } from "src/dialog/Dialog.jsx"

export const StartPlayerRoundDialog = ({
  openDrawCardDialog,
  closeDialog,
  dialogIsOpen,
  player,
}) => {
  const startPlaying = useStartPlaying()
  const setCurrentPlayerGettingReady = useSetCurrentPlayerGettingReady()
  return (
    <Dialog isOpen={dialogIsOpen} onRequestClose={closeDialog} requestCloseOnClickOutside={true}>
      <div className="dialog-content score-board-dialog">
        <div className="cross" onClick={closeDialog}>
          X
        </div>
        <div className="dialog-body">
          <div>
            Au tour de
            <div className="dialog-label">{player.character.name}</div>
            <img
              className="player-img"
              src={player && player.character.img}
              alt="player"
              style={{
                boxShadow: `inset 0px 0px 0px 4px ${(player && player.character.color) || "black"}`,
              }}
            />
          </div>
          <div className="dialog-actions">
            <button
              onClick={() => {
                closeDialog()
                setCurrentPlayerGettingReady()
                startPlaying(player)
                openDrawCardDialog()
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

const useSetCurrentPlayerGettingReady = createAction((state) => {
  return {
    ...state,
    currentPlayerGettingReady: true,
  }
})
