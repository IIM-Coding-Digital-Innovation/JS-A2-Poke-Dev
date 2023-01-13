'use strict';

let searchResults = document.querySelector('.search-results');
let nameInput = document.querySelector('.name-input');
let idInput = document.querySelector('.id-input');

let pokemonPicture = document.querySelector('.pokemon-picture');
let addToTeam = document.querySelector('.add-to-team');
let pokemonName = document.querySelector('.pokemon-name');
let pokemonId = document.querySelector('.pokemon-id');

let allSlot = document.querySelectorAll('.slot-pokemon');
let pokemonStack = [];
let pokemonfull;

/*
===================================================================
RECHERCHER UN POKEMON
*/
function search(query) {
  fetch('https://pokeapi.co/api/v2/pokemon/' + query)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      pokemonName.innerHTML = response['name'];
      pokemonId.innerHTML = response['id'];
      pokemonPicture.src = response['sprites']['front_default'];
      addToTeam.style.visibility = 'visible';
      return (
        (pokemonStack = [
          response['name'],
          response['id'],
          response['sprites']['front_default'],
          response['stats'],
        ]),
        (pokemonfull = response)
      );
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Creer un bouton delete
function addDeleteButton(element) {
  let createDelete = document.createElement('div');
  createDelete.innerHTML = 'X';
  createDelete.classList.add('delete-button');
  element.appendChild(createDelete);
}

function deletePokemon(element) {
  element.innerHTML = '';
}

nameInput.addEventListener('keyup', function () {
  let query = nameInput.value;
  search(query);
});

idInput.addEventListener('keyup', function () {
  let query = idInput.value;
  search(query);
});
/*
===================================================================
Create Stat Card
*/
let statsDiv;
function createStatsCard(stats) {
  console.log(stats);
  statsDiv = document.createElement('div');
  statsDiv.classList.add('stats-div');
  stats.forEach((e) => {
    let stats = document.createElement('div');
    stats.classList.add('little-stats');
    stats.innerHTML += e['stat']['name'] + ' :';
    stats.innerHTML += e['base_stat'];
    statsDiv.appendChild(stats);
  });
  return statsDiv;
}

/*
===================================================================
AJOUTER UN POKEMON A SON EQUIPE
*/

let team = [];
addToTeam.addEventListener('click', function addTheTeam() {
  for (let i = 0; i < allSlot.length; i++) {
    if (allSlot[i].innerHTML === '') {
      let pokemonImageTeam = document.createElement('img');
      let pokemonNameTeam = document.createElement('div');
      let pokemonname = document.createElement('h3');
      pokemonNameTeam.classList.add('name-stats');
      pokemonImageTeam.draggable = 'false';

      pokemonname.innerHTML += pokemonStack[0];
      pokemonNameTeam.appendChild(pokemonname);
      pokemonImageTeam.src = pokemonStack[2];
      console.log(pokemonStack[3]);
      createStatsCard(pokemonStack[3]);

      pokemonNameTeam.appendChild(statsDiv);
      allSlot[i].appendChild(pokemonNameTeam);
      allSlot[i].appendChild(pokemonImageTeam);

      addDeleteButton(allSlot[i]);
      team.push(pokemonfull);
      i = allSlot.length;
    }
  }
  let deleteButton = document.querySelectorAll('.delete-button');
  deleteButton.forEach((e) => {
    e.addEventListener('click', function () {
      console.log('ouais');
      deletePokemon(e.parentElement);
    });
  });
});

/*
===================================================================
DRAG AND DROP POKEMON
*/

let draggableElement = document.querySelectorAll('.slot-pokemon');
let dropzone = document.querySelectorAll('.drop-zone');

let dragged;
let swap;

/* Les événements sont déclenchés sur les objets glissables */
document.addEventListener('drag', function (event) {}, false);

document.addEventListener(
  'dragstart',
  function (event) {
    // Stocke une référence sur l'objet glissable
    dragged = event.target;
    swap = event.target.parentElement;
    // transparence 50%
    event.target.style.opacity = 0.5;
  },
  false
);

document.addEventListener(
  'dragend',
  function (event) {
    event.preventDefault();
    // reset de la transparence
    event.target.style.opacity = '';
  },
  false
);

document.addEventListener(
  'dragenter',
  function (event) {
    event.preventDefault();
    // Met en surbrillance la cible de drop potentielle lorsque l'élément glissable y entre
    if (event.target.className == 'dropzone') {
      event.target.style.background = 'limegreen';
    }
  },
  false
);

document.addEventListener(
  'dragleave',
  function (event) {
    event.preventDefault();
    /* reset de l'arrière-plan des potentielles cible du drop lorsque les éléments glissables les quittent */
    if (event.target.className == 'dropzone') {
      event.target.style.background = '';
    }
  },
  false
);

/* Les événements sont déclenchés sur les cibles du drop */
document.addEventListener(
  'dragover',
  function (event) {
    // Empêche default d'autoriser le drop
    event.preventDefault();
  },
  false
);

document.addEventListener(
  'drop',
  function (event) {
    // Empêche l'action par défaut (ouvrir comme lien pour certains éléments)

    console.log('hezjbfuihfiuehfi');
    // Déplace l'élément traîné vers la cible du drop sélectionnée
    if (event.target.className == 'dropzone') {
      event.target.style.background = '';
      swap = event.target.firstElementChild;
      console.log(event.target.childElement);
      event.target.removeChild(swap);

      dragged.parentElement.appendChild(swap);
      dragged.parentElement.removeChild(dragged);
      event.target.appendChild(dragged);
    }
  },
  false
);

/*
===================================================================
VALIDATE TEAM 
*/

let arcadeModeButton = document.querySelector('.button-target-arcade');
let chooseModeButton = document.querySelector('.button-target-choose');
let validateTeam = document.querySelector('.button-validate');
let startButton = document.querySelector('.start-button');
let yourTeam = document.querySelector('.your-team');

startButton.addEventListener('click', function () {
  localStorage.setItem('pokemon1', JSON.stringify(team));
  document.location.href = 'arcade.html';
});

validateTeam.addEventListener('click', function () {
  console.log(team);
});
