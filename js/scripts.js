let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      Object.keys.length &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Invalid Entry");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function findPokemon(name) {
    return pokemonList.filter((pokemon) => pokemon.name === name);
  }

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
  };
})();

pokemonRepository.add({
  name: "Bulbasaur",
  height: 0.7,
  types: ["grass", "poison"],
});

pokemonRepository.add({
  name: "Charmander",
  height: 0.6,
  types: ["fire"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

// Loops through the pokemonList
// Checks if height is above a certain value
pokemonRepository.getAll().forEach((pokemon) => {
  let pokemonHeight = pokemon.height;
  let pokemonName = pokemon.name;

  if (pokemonHeight > 0.6) {
    document.write(
      `<p>${pokemonName} (height: ${pokemonHeight}) - Wow, that’s big!</p>`
    );
  } else {
    document.write(`<p>${pokemonName} (height: ${pokemonHeight})</p>`);
  }
});
