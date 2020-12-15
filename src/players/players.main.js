const luffyUrl = new URL("/src/players/Luffy.png", import.meta.url).href
const missFortuneUrl = new URL("/src/players/MissFortune.png", import.meta.url).href
const jackSparrowUrl = new URL("/src/players/JackSparrow.png", import.meta.url).href
const barbeRougeUrl = new URL("/src/players/BarbeRouge.png", import.meta.url).href
const ginetteBouletteUrl = new URL("/src/players/GinetteBoulette.png", import.meta.url).href
const capitaineCrochetUrl = new URL("/src/players/CapitaineCrochet.png", import.meta.url).href

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
  { id: 1, name: "Luffy", color: "#ef9620", img: luffyUrl },
  { id: 2, name: "Miss Fortune", color: "#d90f1b", img: missFortuneUrl },
  { id: 3, name: "Jack Sparrow", color: "#007033", img: jackSparrowUrl },
  { id: 4, name: "Barbe Rouge", color: "#7baac9", img: barbeRougeUrl },
  { id: 5, name: "Ginette Boulette", color: "#e2500c", img: ginetteBouletteUrl },
  { id: 6, name: "Capitaine Crochet", color: "#952460", img: capitaineCrochetUrl },
]
