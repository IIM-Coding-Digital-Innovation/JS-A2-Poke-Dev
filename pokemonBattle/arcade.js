'use strict'

let attacksDiv = document.querySelector(".attacks")
let yourTeamDiv = document.querySelector(".your-team")
let youTeam =[]
let allSlot =document.querySelectorAll(".slot-pokemon")

let statsDiv



youTeam = JSON.parse(localStorage.pokemon1);

function createStatsCard(stats){
    console.log(stats)
    statsDiv=document.createElement("div")
    statsDiv.classList.add("stats-div")
    stats.forEach(e=>{
        let stats=document.createElement("div")
        stats.classList.add('little-stats')
        stats.innerHTML+=e["stat"]["name"]+" :"
        stats.innerHTML+=e["base_stat"]
        statsDiv.appendChild(stats)

    })
    return statsDiv
}

for(let i=0;i<allSlot.length;i++){


    let pokemonStack = [youTeam[i]["name"],youTeam[i]["sprites"]["front_default"],youTeam[i]["stats"]]
    let pokemonImageTeam=document.createElement('img');
    let pokemonNameTeam=document.createElement("div");
    let pokemonname=document.createElement("h3");
    pokemonNameTeam.classList.add("name-stats");
    pokemonImageTeam.draggable= "false";

    pokemonname.innerHTML+=pokemonStack[0];
    pokemonNameTeam.appendChild(pokemonname)
    pokemonImageTeam.src=pokemonStack[1];
    console.log(pokemonStack[2]);
    createStatsCard(pokemonStack[2]);
    
    pokemonNameTeam.appendChild(statsDiv);
    allSlot[i].appendChild(pokemonNameTeam);
    allSlot[i].appendChild(pokemonImageTeam);
    
    
    
    

}



/*
============================================================
GENERATE ENNEMY
*/

let ennemySlot = document.querySelector(".ennemy")
let ennemyName=document.querySelector(".ennemyName")
let ennemyImg=document.querySelector(".ennemyImage")
let ennemyHp=document.querySelector(".ennemyHP")

let randomPokemon = Math.floor(Math.random() * 1154)
function search(query){
    fetch('https://pokeapi.co/api/v2/pokemon/'+query)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response);
        ennemyName.innerHTML=response["name"];
        ennemyImg.src=response["sprites"]["front_default"]
        ennemyHp.innerHTML+=response["stats"][0]["base_stat"]
    })
    .catch(function(error){
        console.log(error);
    })
}

let ennemy = search(randomPokemon)





let chooseText=document.querySelector(".choose-pokemon-text")
let yourPokemon = document.querySelector(".your-pokemon")

let pickPokemon
let pickPokemonMoves=[]
let comnatSetUp = false

function gameLoop(){
console.log(yourPokemon)
chooseText.style.visibility="visible"
if (yourPokemon.childNodes.length===1){


    allSlot.forEach(e=>{
        e.addEventListener("click",function eventListener(){
           if(yourPokemon.childNodes.length===1){
            e.parentElement.removeChild(e)
            yourPokemon.appendChild(e)
            pickPokemon=yourPokemon.childNodes[1].childNodes[0].childNodes[0].innerHTML;
            youTeam.forEach(e=>{
                if(e["name"]===pickPokemon){
                    pickPokemon=e;
                    return pickPokemon
                }
            })
            
            
           }
           for(let i=0 ; i<4 ; i++){
                let randomMoves = Math.floor(Math.random() * 99)
                pickPokemonMoves.push(pickPokemon["moves"][randomMoves])
                console.log(pickPokemonMoves)
            
         
            }
            this.removeEventListener('click', eventListener)
            
            

        })
        allSlot.removeEventListener("click",eventListener)
        
    })
   
   


  
    chooseText.style.visibility="hidden"
    return comnatSetUp=true , pickPokemonMoves
}   
}


    
gameLoop();
displayMoves();
  
      
   
   

function displayMoves(){
   console.log(pickPokemonMoves)
}



