import { createMilleSabordGame } from "src/createMilleSabordGame.js"
import { createDeck, CARD_PIRATE } from "src/Cards/cards.js"

createMilleSabordGame({
  into: document.querySelector("#mille-sabord-container"),
  initialState: {
    cardDeck: createDeck({ [CARD_PIRATE]: 1 }),
  },
})
