import { createMilleSabordGame } from "src/createMilleSabordGame.js"
import { CARD_TWO_SWORDS_CHALLENGE } from "src/constants.js"
import { createDeck } from "src/Cards/cards.js"

sessionStorage.clear()
createMilleSabordGame({
  into: document.querySelector("#mille-sabord-container"),
  initialState: {
    cardDeck: createDeck({ [CARD_TWO_SWORDS_CHALLENGE]: 1 }),
  },
})
