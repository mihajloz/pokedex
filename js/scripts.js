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
    listItem.classList.add("list-group-item"); // Add Bootstrap class

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    button.classList.add("btn", "btn-success"); // Add Bootstrap classes
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

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
      showModal(pokemon);
    });
  }

  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();

    //creating element for name in modal content
    let nameElement = $("<h1 class='modalPokemonName'>" + item.name + "</h1>");
    // // creating img in modal content
    let imageElement = $('<img class="modal-img" style="width:50%">');
    imageElement.attr("src", item.imageUrl);
    // //creating element for height in modal content
    let heightElement = $("<p>" + "Height : " + item.height + "</p>");
    // //creating element for weight in modal content
    let weightElement = $("<p>" + "Weight : " + item.weight + "</p>");
    // //creating element for type in modal content
    let typesElement = $("<p>" + "Types : " + item.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  function searchPokemon() {
    let searchInput = document.getElementById("search-input");
    let searchText = searchInput.value.toLowerCase();
    let allPokemon = document.querySelectorAll(".list-group-item");

    allPokemon.forEach(function (pokemon) {
      let pokemonText = pokemon
        .querySelector(".pokemon-button")
        .innerText.toLowerCase();
      let searchList = document.querySelector(".pokemon-list");

      if (pokemonText.includes(searchText)) {
        searchList.classList.add("search-list");
        pokemon.style.display = "inline-block";
      } else {
        pokemon.style.display = "none";
      }

      if (!searchInput.value) {
        searchList.classList.remove("search-list");
      }
    });
  }

  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function () {
    searchPokemon();
  });

  return {
    add: add,
    getAll: getAll,
    findPokemon: findPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
