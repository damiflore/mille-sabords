/**
 * computeScore { currentCard, diceKept }
 * currentCard is the current card that can affect the score
 * diceKept is an array of 8 symbols.
 * computeScore returns a number representing the score according to diceKept and currentCard.
 *
 * It must follow the following rules:
 *
 * - coin = +100
 * - diamond = +100
 * - 3 identic symbols = +100
 * - 4 identic symbols = +200
 * - 5 identic symbols = +500
 * - 6 identic symbols = +1000
 * - 7 identic symbols = +2000
 * - 8 identic symbols = +4000
 * - perfect: +500
 *
 * Perfect means every symbol in the array bring points.
 * If a symbol in the array does not increase your points, perfect is not verified.
 *
 *
 */

import "./animals.js"
import "./chest.js"
import "./coin.js"
import "./pirate.js"
// import "./sword-challenge.js"
