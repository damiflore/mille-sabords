export const cardsRules = {
  "animals": {
    name: "Animaux",
    rule:
      "Les singes et les perroquest obtenus sur les dés comptent comme un même symbol dans une combinaison.",
    more:
      "Par exemple 2 perroquets et 3 singes forment une conbinaison de 5 dés identiques, soit 500 points.",
  },
  "chest": {
    name: "Coffre au trésor",
    rule:
      'Lorsque le joueur sauvegarde ses dés, grâce à la carte "Coffre au trésor" les dés sont protégés du mauvais sort.',
    more:
      "Ainsi même lorsque le joueur obtient 3 têtes de morts, son tour prends fin, mais il peut marquer les points totalisés grâce aux dés sauvegardés!",
  },
  "coin": {
    name: "Pièce d'or",
    rule:
      "Le joueur commence son tour avec un symbol pièce d'or. Il rapporte des points aussi bien dans une combinaison de dés que comme simple pièce (+100).",
  },
  "diamond": {
    name: "Diamant",
    rule:
      "Le joueur commence son tour avec un symbol diamant. Il rapporte des points aussi bien dans une combinaison de dés que comme simple diamant (+100).",
  },
  "pirate": {
    name: "Capitaine des pirates",
    rule:
      "Grâce à l'aide du capitaine, tous les points comptabilisés pendant ce tour sont doublés !",
    //   more: "Si le joueur doit se rendre sur l'île de la tête de mort, ses adversaires perdent 200 points pour chaque tête de mort révélée."
  },
  "witch": {
    name: "Sorcière",
    rule:
      "Avec ses potions magiques, la sorcière permet exceptionnellement au joueur de relancer, une fois, un dé avec une tête de mort.",
  },
  "1skull": {
    name: "Tête de mort",
    rule: "Le tour du joueur débute avec un symbole tête de mort",
  },
  "2skulls": {
    name: "2 têtes de mort",
    rule: "Le tour du joueur débute avec 2 symboles tête de mort",
  },
  "2sword-challenge": {
    name: "Bateau pirate",
    rule:
      "Le joueur doit obtenir au minimum 2 symbols sabres. Si il y parvient, il gagne +300 points, en plus de son résultat aux dés. Si il échoue, le joueur marque -300 points pour ce tour, quelque soit son résultat aux dés.",
    more:
      "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points.",
    // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."
  },
  "3sword-challenge": {
    name: "Bateau pirate",
    rule:
      "Le joueur doit obtenir au minimum 3 symbols sabres. Si il y parvient, il gagne +500 points, en plus de son résultat aux dés. Si il échoue, le joueur marque -500 points pour ce tour, quelque soit son résultat aux dés.",
    more:
      "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points.",
    // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."
  },
  "4sword-challenge": {
    name: "Bateau pirate",
    rule:
      "Le joueur doit obtenir au minimum 4 symbols sabres. Si il y parvient, il gagne +1000 points, en plus de son résultat aux dés. Si il échoue, le joueur marque -1000 points pour ce tour, quelque soit son résultat aux dés.",
    more:
      "Le score total ne peut pas descende en dessous de zéro. Ainsi si par exemple le joueur perds le défi au premier tour il restera à 0 points.",
    // more: "Celui qui découvre un bateau pirate ne peut pas aller sur l'île de la tête de mort: un joueur qui obtiendrait 4 têtes de mort ou plus lors de son premier lancer perdrait donc immédiatement son tour."
  },
}
