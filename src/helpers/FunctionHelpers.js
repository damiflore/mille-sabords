const diceNumberToSymbol = {
    1: 'coin',
    2: 'diamond',
    3: 'sword',
    4: 'parrot',
    5: 'monkey',
    6: 'skull',
};

const getRandomDiceNumber = () => Math.floor(Math.random() * 6) + 1;

const getRollDiceResults = (diceNumber) => {
    const resultArray = [];
    for (let i = 0; i < diceNumber; i++) {
        const diceNumber = getRandomDiceNumber();
        resultArray.push(diceNumberToSymbol[diceNumber]);
    }
    return resultArray;
}

const countSymbolsOccurences = arr => {
    const count = arr =>
    arr.reduce((a, b) => ({ ...a,
        [b]: (a[b] || 0) + 1
    }), {})

    console.log('occurences', count(arr));
    return count(arr);
}

const computeScore = diceRoll => {
    console.log('diceRoll', diceRoll);
    let score = 0;

    // remove skulls
    const diceRollWithoutSkulls = diceRoll.filter(symbol => symbol !== 'skull');
    console.log('diceRollWithoutSkulls', diceRollWithoutSkulls);

    // add 1 point for each coin and diamond
    diceRollWithoutSkulls.forEach(symbol => {
        if (symbol === 'diamond' || symbol === 'coin') score += 100;
    })

    // add points for dice combinaisons
    const occurencesArray = countSymbolsOccurences(diceRollWithoutSkulls);
    Object.values(occurencesArray).forEach(occurences => {
        if (occurences === 3) score += 100;
        if (occurences === 4) score += 200;
        if (occurences === 5) score += 500;
        if (occurences === 6) score += 1000;
        if (occurences === 7) score += 2000;
        if (occurences === 8) score += 4000;
    })

    console.log('score', score);    
};

computeScore(getRollDiceResults(8));