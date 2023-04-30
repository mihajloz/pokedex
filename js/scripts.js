let pokemonRepository = (function () {
  let pokemonRepository = [];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      Object.keys.length &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonRepository.push(pokemon);
    } else {
      console.log("Invalid Entry");
    }
  }

  function getAll() {
    return pokemonRepository;
  }

  function findPokemon(name) {
    return pokemonRepository.filter((pokemon) => pokemon.name === name);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function addButtonClickListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    addButtonClickListener(button, pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
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

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.add({
  name: "Squirtle",
  height: 0.5,
  types: ["water"],
});

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
