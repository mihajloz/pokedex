let pokemonRepository = (function () {
  let pokemonRepository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function showLoadingMessage() {
    let message = document.createElement("div");
    message.innerText = "Loading...";
    message.classList.add("loading-message");
    document.body.appendChild(message);
  }

  function hideLoadingMessage() {
    let message = document.querySelector(".loading-message");
    if (message) {
      message.remove();
    }
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      Object.keys.length &&
      "name" in pokemon
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

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map((type) => type.type.name);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
