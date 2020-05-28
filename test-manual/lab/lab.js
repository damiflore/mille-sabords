import { createMilleSabordGame } from "src/createMilleSabordGame.js"
import { CARD_FOUR_SWORDS_CHALLENGE, SYMBOL_SKULL, SYMBOL_SWORD } from "src/constants.js"
import { createDeck } from "src/Cards/cards.js"

sessionStorage.clear()
createMilleSabordGame({
  into: document.querySelector("#mille-sabord-container"),
  gameState: {
    cardDeck: createDeck({ [CARD_FOUR_SWORDS_CHALLENGE]: 1 }),
    diceCursed: [
      // { id: 100, symbol: SYMBOL_SKULL },
      // { id: 101, symbol: SYMBOL_SKULL },
    ],
    cardDrawn: true,
    card: CARD_FOUR_SWORDS_CHALLENGE,
    diceKept: [
      { id: 100, symbol: SYMBOL_SWORD },
      { id: 101, symbol: SYMBOL_SWORD },
    ],
  },
})
