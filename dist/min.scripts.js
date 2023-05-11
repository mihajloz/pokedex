let pokemonRepository=function(){let e=[];function t(){let e=document.querySelector(".loading-message");e&&e.remove()}function n(t){"object"==typeof t&&Object.keys.length&&"name"in t?e.push(t):console.log("Invalid Entry")}function o(){return e}function i(e){return fetch(e.detailsUrl).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.height=t.height,e.weight=t.weight,e.types=t.types.map(e=>e.type.name)}).catch(function(e){console.error(e)})}function l(e){i(e).then(function(){a(e)})}function a(e){let t=$(".modal-body"),n=$(".modal-title");n.empty(),t.empty();let o=$("<h1 class='modalPokemonName'>"+e.name+"</h1>"),i=$('<img class="modal-img" style="width:50%">');i.attr("src",e.imageUrl);let l=$("<p>Height : "+e.height+"</p>"),a=$("<p>Weight : "+e.weight+"</p>"),s=$("<p>Types : "+e.types+"</p>");n.append(o),t.append(i),t.append(l),t.append(a),t.append(s)}return document.getElementById("search-input").addEventListener("input",function(){let e,t;t=(e=document.getElementById("search-input")).value.toLowerCase(),document.querySelectorAll(".list-group-item").forEach(function(n){let o=n.querySelector(".pokemon-button").innerText.toLowerCase(),i=document.querySelector(".pokemon-list");o.includes(t)?(i.classList.add("search-list"),n.style.display="inline-block"):n.style.display="none",e.value||i.classList.remove("search-list")})}),{add:n,getAll:o,findPokemon:function t(n){return e.filter(e=>e.name===n)},addListItem:function e(t){let n=document.querySelector(".pokemon-list"),o=document.createElement("li");o.classList.add("list-group-item");let i=document.createElement("button");i.innerText=t.name,i.classList.add("pokemon-button"),i.classList.add("btn","btn-success"),i.setAttribute("data-toggle","modal"),i.setAttribute("data-target","#pokemonModal"),o.appendChild(i),n.appendChild(o),function e(t,n){t.addEventListener("click",function(){l(n)})}(i,t)},loadList:function e(){let o;return(o=document.createElement("div")).innerText="Loading...",o.classList.add("loading-message"),document.body.appendChild(o),fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return t(),e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url})})}).catch(function(e){t(),console.error(e)})},loadDetails:i,showDetails:l,showModal:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});