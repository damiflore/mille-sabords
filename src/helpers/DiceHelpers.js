const diceNumberToSymbol = {
    1: 'coin',
    2: 'diamond',
    3: 'sword',
    4: 'parrot',
    5: 'monkey',
    6: 'skull',
};

const getRandomDiceNumber = () => Math.floor(Math.random() * 6) + 1;

export const getRollDiceResults = diceNumber => {
    const rollDice = [];
    for (let i = 0; i < diceNumber; i++) {
        const diceNumber = getRandomDiceNumber();
        rollDice.push(diceNumberToSymbol[diceNumber]);
    }
    return rollDice;
}
