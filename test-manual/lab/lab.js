import { createMilleSabordGame } from "src/createMilleSabordGame.js"
import { createDeck, CARD_WITCH } from "src/Cards/cards.js"

sessionStorage.clear()
createMilleSabordGame({
  into: document.querySelector("#mille-sabord-container"),
  initialState: {
    cardDeck: createDeck({ [CARD_WITCH]: 1 }),
  },
})
