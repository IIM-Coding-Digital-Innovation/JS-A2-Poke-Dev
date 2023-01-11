let pokedex = document.querySelector('#pokedex');
let searchInput = document.querySelector('#query');
let submitButton = document.querySelector('#submit');
let pokedexDictionary = document.querySelector('#dictionary');
let page = 0;
let previousUrl = '';
let nextUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=24';
let previousButton = document.querySelector('#previous');
let nextButton = document.querySelector('#next');

loadPage(nextUrl);

previousButton.addEventListener('click', () => {
    if (previousUrl != '') {
        loadPage(previousUrl);
    }
})

nextButton.addEventListener('click', () => {
    if (nextUrl != '') {
        loadPage(nextUrl);
    }
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


        let pokemonNames = data.results.map(pokemon => {
            return pokemon.name;
        })

        let pokemonPromises = data.results.map(pokemon => {
            return fetch(pokemon.url).then(response => response.json());
        })
        
        Promise.all(pokemonPromises).then(pokemonData => {
            pokemonData.forEach((data, index) => {
                let card = document.createElement('a');
                        card.classList.add('pokemon-card');
                        let noise = document.createElement('img');
                        noise.classList.add('noise');
                        noise.src = './img/noise.jpg';
                        let img = document.createElement('img');
                        img.src = data.sprites.front_default;
                        let infos = document.createElement('div');
                        let name = document.createElement('span');
                        name.innerHTML = pokemonNames[index].charAt(0).toUpperCase() + pokemonNames[index].slice(1);
                        let stats = document.createElement('ul');
                        let hp = document.createElement('li');
                        let hpData = document.createElement('text');
                        hpData.innerHTML = '<span>HP...............................................................................</span><span></span><span>' + data.stats[1].base_stat + '</span>';
                        hp.appendChild(hpData);
                        let attack = document.createElement('li');
                        let attackData = document.createElement('text');
                        attackData.innerHTML = '<span>Attack...............................................................................</span><span>' + data.stats[2].base_stat + '</span>';
                        attack.appendChild(attackData);
                        let defense = document.createElement('li');
                        let defenseData = document.createElement('text');
                        defenseData.innerHTML = '<span>Defense...............................................................................</span><span>' + data.stats[3].base_stat + '</span>';
                        defense.appendChild(defenseData);

                        stats.appendChild(hp);
                        stats.appendChild(attack);
                        stats.appendChild(defense);

                        infos.appendChild(name);
                        infos.appendChild(stats);

                        card.appendChild(noise);
                        card.appendChild(img);
                        card.appendChild(infos);

                        pokedexDictionary.appendChild(card);
            })
        })
    })
    .catch(function(error) {
        console.log(error);
    })
}