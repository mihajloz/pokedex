let pokemonList = [];

pokemonList[0] = {
  name: "Bulbasaur",
  height: 0.7,
  types: ["grass", "poison"],
};

pokemonList[1] = {
  name: "Charmander",
  height: 0.6,
  types: ["fire"],
};

pokemonList[2] = {
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
};

// Loops through the pokemonList
// Checks if height is above a certain value
for (let i = 0; i < pokemonList.length; i++) {
  let pokemonHeight = pokemonList[i]["height"];
  let pokemonName = pokemonList[i]["name"];

  if (pokemonHeight > 0.6) {
    document.write(
      `<p>${pokemonName} (height: ${pokemonHeight}) - Wow, that’s big!</p>`
    );
  } else {
    document.write(`<p>${pokemonName} (height: ${pokemonHeight})</p>`);
  }
}
