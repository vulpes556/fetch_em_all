const pokemonData = [
  {
    name: "Bulbasaur",
    hp: 45,
    maxHp: 45,
    attack: 49,
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    type: "Grass",
    attacks: [
      { name: "Tackle", damage: 5, accuracy: 0.9, uses: 10 },
      { name: "Vine Whip", damage: 7, accuracy: 0.8, uses: 5 },
    ],
  },
  {
    name: "Charmander",
    hp: 39,
    maxHp: 39,
    attack: 52,
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    type: "Fire",
    attacks: [
      { name: "Scratch", damage: 4, accuracy: 0.95, uses: 10 },
      { name: "Ember", damage: 8, accuracy: 0.75, uses: 5 },
    ],
  },
  {
    name: "Squirtle",
    hp: 44,
    maxHp: 44,
    attack: 48,
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    type: "Water",
    attacks: [
      { name: "Tackle", damage: 4, accuracy: 0.9, uses: 10 },
      { name: "Water Gun", damage: 7, accuracy: 0.8, uses: 5 },
    ],
  },
  {
    name: "Pikachu",
    hp: 35,
    maxHp: 35,
    attack: 55,
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    type: "Electric",
    attacks: [
      { name: "Quick Attack", damage: 6, accuracy: 0.95, uses: 10 },
      { name: "Thunder Shock", damage: 9, accuracy: 0.8, uses: 5 },
    ],
  }
]

export default pokemonData;