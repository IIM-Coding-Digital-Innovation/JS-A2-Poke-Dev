let pokedex = document.querySelector('#pokedex');
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search');
let submitButton = document.querySelector('#submit');
let pokedexDictionary = document.querySelector('#dictionary');
let page = 0;
let previousUrl = '';
let nextUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24';
let previousButton = document.querySelector('#previous');
let nextButton = document.querySelector('#next');
let keyboardLog = '';
let isShiny = false;
let cards = document.querySelectorAll('a');
let exit = document.querySelector('.exit');
let overviewParent = document.querySelector('#pokemon-overview');
let overview = document.querySelector('#overview-card');
let evolutions;
let speciesUrl;
let rainContainer = document.querySelector('#rain');
let clickCount = 0;
let timeout;
let typeSelect = document.querySelector('#type-select');

typeSelect.addEventListener('change', () => {
  pokedexDictionary.className =
    typeSelect.value == 'all' ? '' : typeSelect.value;
});

document.addEventListener('keydown', function (event) {
  keyboardLog += event.key;
  if (keyboardLog.endsWith('shiny')) {
    document.querySelector('body').classList.toggle('shiny');
    keyboardLog = '';
  }
  if (document.activeElement === searchInput && event.key === 'Enter') {
    displayPokemonInfos(searchInput.value);
  }
  if (event.key === 'Escape') {
    overviewParent.style.display = null;
  }
});

exit.addEventListener('click', () => {
  overviewParent.style.display = null;
});

searchButton.addEventListener('click', () => {
  displayPokemonInfos(searchInput.value);
});

loadPage(nextUrl);

previousButton.addEventListener('click', () => {
  if (previousUrl != '') {
    loadPage(previousUrl);
  }
  overviewParent.style.display = null;
});

nextButton.addEventListener('click', () => {
  if (nextUrl != '') {
    loadPage(nextUrl);
  }
  overviewParent.style.display = null;
});

function loadPage(url) {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      previousUrl = !(data.previous === null) ? data.previous : '';
      nextUrl = !(data.next === null) ? data.next : '';

      pokedexDictionary.innerHTML = '';

      let pokemonPromises = data.results.map((pokemon) => {
        return fetch(pokemon.url).then((response) => response.json());
      });
      Promise.all(pokemonPromises)
        .then((pokemonData) => {
          pokemonData.forEach((data, index) => {
            console.log(data);
            let card = document.createElement('a');
            card.classList.add('pokemon-card');
            let noise = document.createElement('img');
            noise.classList.add('noise');
            noise.src = './img/noise.jpg';
            let img = document.createElement('img');
            img.classList.add('regular');
            img.src = data.sprites.front_default;
            let imgShiny = document.createElement('img');
            imgShiny.classList.add('shiny');
            imgShiny.src = data.sprites.front_shiny;
            let infos = document.createElement('div');
            let name = document.createElement('span');
            name.innerHTML = data.name;
            let id = document.createElement('span');
            id.innerHTML = '#' + data.id;
            let stats = document.createElement('ul');
            let hp = document.createElement('li');
            let hpData = document.createElement('text');
            hpData.innerHTML =
              '<span>HP...............................................................................</span><span></span><span>' +
              data.stats[0].base_stat +
              '</span>';
            hp.appendChild(hpData);
            let attack = document.createElement('li');
            let attackData = document.createElement('text');
            attackData.innerHTML =
              '<span>Attack...............................................................................</span><span>' +
              data.stats[1].base_stat +
              '</span>';
            attack.appendChild(attackData);
            let defense = document.createElement('li');
            let defenseData = document.createElement('text');
            defenseData.innerHTML =
              '<span>Defense...............................................................................</span><span>' +
              data.stats[2].base_stat +
              '</span>';
            defense.appendChild(defenseData);

            card.addEventListener('click', () => {
              displayPokemonInfos(data.id);
            });

            data.types.forEach((type) => {
              card.classList.add(type.type.name);
            });

            stats.appendChild(hp);
            stats.appendChild(attack);
            stats.appendChild(defense);

            name.appendChild(id);

            infos.appendChild(name);
            infos.appendChild(stats);

            card.appendChild(noise);
            card.appendChild(img);
            card.appendChild(imgShiny);
            card.appendChild(infos);

            pokedexDictionary.appendChild(card);
          });
        })
        .then(() => {
          cards = document.querySelectorAll('a');
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayPokemonInfos(pokemonName) {
  overview.innerHTML = '';
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonName)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      speciesUrl = data.species.url;

      let primaryPokemon = document.createElement('div');
      primaryPokemon.classList.add('primary-pokemon');

      let img = document.createElement('img');
      img.classList.add('regular');
      img.src = data.sprites.front_default;

      let imgShiny = document.createElement('img');
      imgShiny.classList.add('shiny');
      imgShiny.src = data.sprites.front_shiny;

      let pokemonInfos = document.createElement('div');
      pokemonInfos.classList.add('pokemon-infos');

      let name = document.createElement('span');
      name.innerHTML = data.name;

      let id = document.createElement('span');
      id.innerHTML = '#' + data.id;
      name.appendChild(id);

      let stats = document.createElement('ul');
      stats.classList.add('stats');
      let hp = document.createElement('li');
      let hpData = document.createElement('text');
      hpData.innerHTML =
        '<span>HP: </span><span></span><span>' +
        data.stats[0].base_stat +
        '</span>';
      hp.appendChild(hpData);
      let attack = document.createElement('li');
      let attackData = document.createElement('text');
      attackData.innerHTML =
        '<span>Attack: </span><span>' + data.stats[1].base_stat + '</span>';
      attack.appendChild(attackData);
      let defense = document.createElement('li');
      let defenseData = document.createElement('text');
      defenseData.innerHTML =
        '<span>Defense: </span><span>' + data.stats[2].base_stat + '</span>';
      defense.appendChild(defenseData);

      stats.appendChild(hp);
      stats.appendChild(attack);
      stats.appendChild(defense);

      let types = document.createElement('ul');
      types.classList.add('types');
      data.types.forEach((type) => {
        let typeLi = document.createElement('li');
        typeLi.classList.add(type.type.name);
        typeLi.innerHTML = type.type.name;
        types.appendChild(typeLi);
      });

      let title = document.createElement('h3');
      title.innerHTML = 'Evolutions';

      evolutions = document.createElement('ul');
      evolutions.classList.add('evolutions');

      primaryPokemon.appendChild(img);
      primaryPokemon.appendChild(imgShiny);
      pokemonInfos.appendChild(name);
      pokemonInfos.appendChild(stats);
      pokemonInfos.appendChild(types);
      primaryPokemon.appendChild(pokemonInfos);
      overview.appendChild(primaryPokemon);
      overview.appendChild(title);
      overview.appendChild(evolutions);

      img.addEventListener('click', function () {
        console.log(clickCount);
        clickCount++;
        if (clickCount === 3) {
          rain(img.src);
          clickCount = 0;
        } else {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            clickCount = 0;
          }, 300);
        }
      });

      imgShiny.addEventListener('click', function () {
        clickCount++;
        if (clickCount === 3) {
          rain(imgShiny.src);
          clickCount = 0;
        } else {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            clickCount = 0;
          }, 300);
        }
      });
    })
    .then(() => {
      fetch(speciesUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          fetch(data.evolution_chain.url)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data.chain);
              displayEvolutions(evolutions, data.chain);
            });
        });
    })
    .catch(function (error) {
      let errorMessage = document.createElement('text');
      errorMessage.innerHTML = 'No Pokemon found';
      overview.appendChild(errorMessage);
      overviewParent.style.display = 'flex';
    });
}

function displayEvolutions(parent, chain) {
  let evolution = document.createElement('li');
  console.log(chain);
  getId(chain.species.url);

  fetch('https://pokeapi.co/api/v2/pokemon/' + chain.species.name)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let img = document.createElement('img');
      img.classList.add('regular');
      img.src = data.sprites.front_default;
      let imgShiny = document.createElement('img');
      imgShiny.classList.add('shiny');
      imgShiny.src = data.sprites.front_shiny;
      let name = document.createElement('span');
      name.innerHTML = data.name;
      let id = document.createElement('span');
      id.innerHTML = '#' + data.id;
      name.appendChild(id);
      let types = document.createElement('ul');
      types.classList.add('types');
      data.types.forEach((type) => {
        let typeLi = document.createElement('li');
        typeLi.classList.add(type.type.name);
        typeLi.innerHTML = type.type.name;
        types.appendChild(typeLi);
      });

      evolution.addEventListener('click', () => {
        displayPokemonInfos(data.id);
      });

      evolution.appendChild(img);
      evolution.appendChild(imgShiny);
      evolution.appendChild(name);
      evolution.appendChild(types);
      evolutions.appendChild(evolution);

      if (chain.evolves_to.length > 0) {
        let separator = document.createElement('li');
        separator.classList.add('separator');
        separator.innerHTML = '>';
        evolutions.appendChild(separator);
        chain.evolves_to.forEach((newChain) => {
          displayEvolutions(parent, newChain);
        });
      } else {
        overviewParent.style.display = 'flex';
      }
    });
}

function rain(imgUrl) {
  for (let i = 0; i < 200; i++) {
    let rainDrop = document.createElement('img');
    rainDrop.classList.add('raindrop');
    rainDrop.src = imgUrl;
    rainDrop.style.left = Math.floor(Math.random() * 100) + 'vw';
    rainDrop.style.scale = 0.3 + Math.random() * 1.5;
    rainDrop.style.animationDelay = Math.random() * 2 + 's';
    document.querySelector('body').appendChild(rainDrop);
  }
}

function getId(url) {
  url = url.split('/');
  return url[url.length - 2];
}
