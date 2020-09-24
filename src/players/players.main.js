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
  { id: 1, name: "Luffy", color: "#ef9620", img: "Luffy.png" },
  { id: 2, name: "Miss Fortune", color: "#d90f1b", img: "MissFortune.png" },
  { id: 3, name: "Jack Sparrow", color: "#007033", img: "JackSparrow.png" },
  { id: 4, name: "Barbe Rouge", color: "#7baac9", img: "BarbeRouge.png" },
  { id: 5, name: "Ginette Boulette", color: "#e2500c", img: "GinetteBoulette.png" },
  { id: 6, name: "Capitaine Crochet", color: "#952460", img: "CapitaineCrochet.png" },
]
