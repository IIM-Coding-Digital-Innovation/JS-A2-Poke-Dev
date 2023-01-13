getPokeData = async function() {
    const pokemon = await getPokemon();
    const randomPokemon = shuffle(pokemon);
    const pokemonChoices = getchoices(randomPokemon);
    const [ firstPokemon ] = pokemonChoices;
    // console.log(pokemon)
    const image = getPokemonImage(firstPokemon);
  
    return { 
      pokemonChoices: shuffle(pokemonChoices),
      correct: {
        image,
        name: firstPokemon.name,
      }
    };
  };
  
  
  
  async function getPokemon() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200');
    const pokemon = await res.json();
    
    return pokemon.results;
  }
  
  


function shuffle(unshuffled) {
    for (let i = unshuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [unshuffled[i], unshuffled[j]] = [unshuffled[j], unshuffled[i]];
    }
    return unshuffled;
  }

  
  function getchoices(randomPokemon) {
    return randomPokemon.splice(0, 4);
  }
  
  function getPokemonImage({ url }) {
    // console.log('hey', url)
    const number = getNumber(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
  };
  
  
  
  function getNumber(url) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 2];
    if (!isNaN(lastPart)) {
      return lastPart;
    }
    return null;
  }
  
  
  
  
  
  const main = document.querySelector('main');
  const pokemonImage = document.querySelector('#pokemon-image');
  const text = document.querySelector('#text');
  const choices = document.querySelector('#choices');
  const playBtn = document.querySelector('#play');
  const NextBtn = document.querySelector('#Next');
  playBtn.addEventListener('click', fetchData);
  NextBtn.addEventListener('click', fetchData);
  addAnswer();
  


  
  async function fetchData() {
    PokeData = await getPokeData();
    showimage();
    displayChoices();
    // document.getElementById('text').style.display='none'

  }

    
  
  function showimage() {
      pokemonImage.src = PokeData.correct.image;
  }


  
  function displayChoices() {
    const { pokemonChoices } = PokeData;
    const choicesHTML = pokemonChoices.map(({ name }) => {
      return `<button data-name="${name}">${name}</button>`;
    }).join('');
  
    choices.innerHTML = choicesHTML;
  }
  
  function addAnswer() {
    choices.addEventListener('click', e => {
      const { name } = e.target.dataset;
      const resultClass = (name === PokeData.correct.name) ?
        'correct' : 'incorrect';
  
      e.target.classList.add(resultClass);
      PokemonName();
      if(resultClass==='correct') {
        document.getElementById('text').style.display='none'
    } else {  
        document.getElementById('text').style.display='block'
    }

    });
  }



//   function NextPoke() {
//     choices.addEventListener('click', e => {
//         const { name } = e.target.dataset;
//         const resultClass = (name === PokeData.correct.name) ?
//           'correct' : 'incorrect';
    
//         e.target.classList.add(resultClass);
//         PokemonName();

  
//       });
    

//   }
  
  function  PokemonName() {
    main.classList.add('pokename');
    text.textContent = `${PokeData.correct.name}!`;
 
  }
  
  