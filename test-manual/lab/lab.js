import { createMilleSabordGame } from "src/createMilleSabordGame.js"
import { CARD_DIAMOND } from "src/constants.js"
import { createDeck } from "src/Cards/cards.js"

sessionStorage.clear()
createMilleSabordGame({
  into: document.querySelector("#mille-sabord-container"),
  initialState: {
    cardDeck: createDeck({ [CARD_DIAMOND]: 1 }),
  },
})
