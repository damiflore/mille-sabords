export const createPlayers = (characters) => {
  return characters.map((character, index) => {
    return {
      id: index + 1,
      character,
      score: 0,
    }
  })
}

export const CHARACTERS = [
  { id: 1, name: "Barbe Rousse", color: "red" },
  { id: 2, name: "Ginette Boulette", color: "green" },
  { id: 3, name: "Jack Sparrow", color: "blue" },
]
