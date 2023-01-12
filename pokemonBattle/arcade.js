'use strict'

let attacksDiv = document.querySelector(".attacks")
let yourTeamDiv = document.querySelector(".your-team")
let youTeam =[]
let allSlot =document.querySelectorAll(".slot-pokemon")
let finishSetUp=false
let statsDiv
let theMove
let theMoves

/*
======================== THE GAME  ====================================

*/

let displayText=document.querySelector(".the-text")




/*
======================== FUNCTION CHOOSE YOUR MOVE ====================================

*/
function chooseMove(){
    console.log("AHAHHAHAHHAHHAHAHHAHHA")
    attacksDiv.addEventListener("click", function(event) {
        if (event.target.classList.contains('move-slot')) {
            console.warn(event.target)
        }
    });
    

}


/*
======================== FUNCTION SEARCH ATTACKS INFO ====================================

*/
function searchForReal(query){

    let attacksSlot = document.querySelector(".attacks")

    fetch(query)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        let moveSlot = document.createElement("div")
        moveSlot.classList.add("move-slot")
        moveSlot.innerHTML+=response["name"] + " "
        moveSlot.innerHTML+=response["flavor_text_entries"][8]["flavor_text"]+ " "
       
        attacksSlot.appendChild(moveSlot)
        
    })
    .catch(function(error){
        console.log(error);
    })
}
/*
======================== GENERATE YOUR TEAM FROM LOCALSTORAGE====================================
-> Get Local Storage
-> Create the cards for the stats
-> create the slot for every pokemon of your team 
*/
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
=============================DISPLAY MOVE===================================
*/
function displayMoves(pickPokemonMoves){
    console.warn(pickPokemonMoves)

    pickPokemonMoves.forEach(e=>{
        searchForReal(e["move"]["url"]);
       
       
    })
   
 }

/*
======================== GENERATE ENNEMY ====================================

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


/*
================================================ CHOOSE YOUR PLAYABLE POKEMON ============================================================================
-> Add event listener on your team
-> move your pokemon to the "battlefield"
-> Generate his moves
-> Display his move
*/


let chooseText=document.querySelector(".choose-pokemon-text")
let yourPokemon = document.querySelector(".your-pokemon")

let pickPokemon
let pickPokemonMoves=[]
let comnatSetUp = false

let gameLoopPromise=new Promise((resolve,reject)=>{
    console.log(yourPokemon)
    chooseText.style.visibility="visible"
    if (yourPokemon.childNodes.length===1){

        console.log(allSlot)
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
                        if(pickPokemonMoves.length<3){

                                for(let i=0 ; i<4 ; i++){
                                    console.log(pickPokemonMoves.length)
                                    let randomMoves = Math.floor(Math.random() * 99)
                                    pickPokemonMoves.push(pickPokemon["moves"][randomMoves])
                                    console.log(pickPokemonMoves)
                                }
                        }
                        if(pickPokemonMoves.length===4){
                                displayMoves(pickPokemonMoves);
                                
                                resolve();
                                
                        }
                }
                /*this.removeEventListener('click', eventListener)*/
                
            })
        
        
        })
        chooseText.style.visibility="hidden"

    }else{
        allSlot.removeEventListener("click", eventListener)
        
    }   
    
})

/*
================================================ RUN THE FONCTION ============================================================================

*/
gameLoopPromise.then(()=>{
    console.log("heu")
   chooseMove()

})




   
   





