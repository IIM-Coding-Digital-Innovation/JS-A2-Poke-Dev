let pokedex = document.querySelector('#pokedex');
let searchInput = document.querySelector('#query');
let submitButton = document.querySelector('#submit');
let pokedexDictionary = document.querySelector('#dictionary');
let page = 0;
let previousUrl = '';
let nextUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
let previousButton = document.querySelector('#previous');
let nextButton = document.querySelector('#next');

submitButton.addEventListener('click', () => {
    
})

loadPage(nextUrl);

previousButton.addEventListener('click', () => {
    loadPage(previousUrl);
})

nextButton.addEventListener('click', () => {
    loadPage(nextUrl);
})

function loadPage(url) {
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data.results);
        previousUrl = !(data.previous === null) ? data.previous:'';
        nextUrl = !(data.next === null) ? data.next:'';
        pokedexDictionary.innerHTML = '';
        data.results.forEach(pokemon => {
            createPokemonCard(pokemon);
        });
    })
    .catch(function(error) {
        console.log(error);
    })
}

function createPokemonCard(pokemon) {
    fetch(pokemon.url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let card = document.createElement('a');
            card.classList.add('pokemon-card');
            let img = document.createElement('img');
            img.src = data.sprites.front_default;
            let infos = document.createElement('div');
            let name = document.createElement('span');
            name.innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            let stats = document.createElement('ul');
            let hp = document.createElement('li');
            let hpData = document.createElement('text');
            hpData.innerHTML = 'HP ' + data.stats[1].base_stat;
            hp.appendChild(hpData);
            let attack = document.createElement('li');
            let attackData = document.createElement('text');
            attackData.innerHTML = 'Attack ' + data.stats[2].base_stat;
            attack.appendChild(attackData);
            let defense = document.createElement('li');
            let defenseData = document.createElement('text');
            defenseData.innerHTML = 'Defense ' + data.stats[3].base_stat;
            defense.appendChild(defenseData);

            stats.appendChild(hp);
            stats.appendChild(attack);
            stats.appendChild(defense);

            infos.appendChild(name);
            infos.appendChild(stats);

            card.appendChild(img);
            card.appendChild(infos);

            pokedexDictionary.appendChild(card);
        })
}