import { createMilleSabordGame } from "src/createMilleSabordGame.js"
import { createDeck, CARD_TWO_SWORDS_CHALLENGE } from "src/Cards/cards.js"

sessionStorage.clear()
createMilleSabordGame({
  into: document.querySelector("#mille-sabord-container"),
  initialState: {
    cardDeck: createDeck({ [CARD_TWO_SWORDS_CHALLENGE]: 1 }),
  },
})
