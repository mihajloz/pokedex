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

  // function showDetails(pokemon) {
  //   loadDetails(pokemon).then(function () {
  //     console.log(pokemon);
  //   });
  // }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";

      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButton = document.createElement("button");
      closeButton.classList.add("modal-close");
      closeButton.innerText = "Close";
      closeButton.addEventListener("click", hideModal);

      let name = document.createElement("h1");
      name.classList.add("pokemon-name");
      name.innerText = pokemon.name;

      let image = document.createElement("img");
      image.classList.add("pokemon-image");
      image.src = pokemon.imageUrl;

      let height = document.createElement("p");
      height.classList.add("pokemon-height");
      height.innerText = "Height: " + pokemon.height;

      let weight = document.createElement("p");
      weight.classList.add("pokemon-weight");
      weight.innerText = "Weight: " + pokemon.weight;

      const types = document.createElement("p");
      types.classList.add("pokemon-types");
      types.innerText = `Type: ${pokemon.types.join(", ")}`;

      modal.appendChild(closeButton);
      modal.appendChild(name);
      modal.appendChild(image);
      modal.appendChild(height);
      modal.appendChild(weight);
      modal.appendChild(types);
      modalContainer.appendChild(modal);

      modalContainer.classList.add("is-visible");

      modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
    });
  }

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

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
