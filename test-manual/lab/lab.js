import { createMilleSabordGame } from "src/createMilleSabordGame.js"
import { CARD_COIN, SYMBOL_SKULL } from "src/constants.js"
import { createDeck } from "src/Cards/cards.js"

sessionStorage.clear()
createMilleSabordGame({
  into: document.querySelector("#mille-sabord-container"),
  gameState: {
    cardDeck: createDeck({ [CARD_COIN]: 1 }),
    diceCursed: [
      { id: 100, symbol: SYMBOL_SKULL },
      { id: 101, symbol: SYMBOL_SKULL },
    ],
  },
})
