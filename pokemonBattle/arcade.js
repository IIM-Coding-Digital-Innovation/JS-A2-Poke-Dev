'use strict'

let attacksDiv = document.querySelector(".attacks")
let yourTeamDiv = document.querySelector(".your-team")
let youTeam =[]
let allSlot =document.querySelectorAll(".slot-pokemon")
let finishSetUp=false
let statsDiv
let theMove
let theMoves

let firstPokemon
let secondPokemon
let currentAttack =[]
let usedAttack


let pokemonDead = false

/*
======================== THE GAME  ====================================

*/

/*let displayText=document.querySelector(".the-text")*/

function useMove(move){

}



/*
======================== FUNCTION CHOOSE YOUR MOVE ====================================

*/
function chooseMove(){
    console.log("AHAHHAHAHHAHHAHAHHAHHA")
    attacksDiv.addEventListener("click", function(event) {
        if (event.target.classList.contains('move-slot')) {
            console.warn(event.target)
            console.log(currentAttack)
            let theAttack = event.target.querySelector(".move-name")
            console.log(theAttack)
            let thePP = event.target.querySelector(".pp-move")
            currentAttack.forEach(e=>{
                console.log(e["name"])
                console.log(theAttack.innerHTML)
                if(e["name"]===theAttack.innerHTML){
                    usedAttack=e
                    damages(pickPokemon,secondPokemon,usedAttack)
                }
            })
        }
    });
    

}
/*
======================== FUNCTION ennemmyDamages ====================================

*/
function ennemyAttacks(yourPokemon,ennemy){
    console.log(ennemy)
    let randomMoves = Math.floor(Math.random() * 4)
    let ennemyattack=ennemy["moves"][randomMoves]
    console.log(ennemyattack)
    let query = ennemyattack["move"]["url"]

    fetch(query)
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        return response
    })
    .catch(function(error){
        console.log(error)
    })
    let infoText = document.querySelector(".the-text")
    let degats = response["power"];
    infoText.innerHTML = ennemy["name"] + " lance " + attack["name"] +", " +yourPokemon["name"] + " lost " + degats + " HP";
    let newhp = yourPokemon["stats"][0]["base_stat"] - degats
    

    if(newhp<0){
        pokemonDead = true
    }else{
        ennemyAttacks(yourPokemon,ennemy)
    }é
}


/*
======================== FUNCTION DAMAGES ====================================

*/

function damages(yourPokemon,ennemy,attack){
    let infoText = document.querySelector(".the-text")
    let degats = attack["power"];
    infoText.innerHTML = yourPokemon["name"] + " lance " + attack["name"] +", " +ennemy["name"] + " lost " + degats + " HP";
    let newhp = ennemy["stats"][0]["base_stat"] - degats
    ennemyHp.innerHTML="HP : "+newhp

    if(newhp<0){
        pokemonDead = true
    }else{
        ennemyAttacks(yourPokemon,ennemy)
    }
    return degats

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
        console.log(response)
        let moveSlot = document.createElement("div")
        moveSlot.classList.add("move-slot")
        let textMove = document.createElement("H3")
        textMove.classList.add("move-name")
        let nameMove = document.createElement("p")
        let dataMove = document.createElement("ul")
        let accuracy =document.createElement("li")
        let damage =document.createElement("li")
        let pp=document.createElement("li")
        pp.classList.add("pp-move")

        pp.innerHTML= "PP : " + response["pp"]

        if(response["accuracy"]===null){
            accuracy.innerHTML= "Accuracy : x "
        }else{
            accuracy.innerHTML= "Accuracy : "+response["accuracy"]
        }
        if(response["power"]===null){
            damage.innerHTML= "Power : x "
        }else{
            damage.innerHTML="Power : "+ response["power"]
        }
        
    

        dataMove.appendChild(accuracy);
        dataMove.appendChild(damage);
        dataMove.appendChild(pp)

        textMove.innerHTML=response["name"]
        nameMove.innerHTML=response["flavor_text_entries"][8]["flavor_text"]+ " "
        moveSlot.appendChild(textMove)
        moveSlot.appendChild(nameMove)
        moveSlot.appendChild(dataMove)
        attacksSlot.appendChild(moveSlot)
        return currentAttack.push(response)
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
        if(e["stat"]["name"]=""){}
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
        return secondPokemon = response
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
                                    let randomMoves = Math.floor(Math.random() * 50)
                                 
                                        pickPokemonMoves.push(pickPokemon["moves"][randomMoves])
                                        console.log(pickPokemonMoves)
                                    
                                   
                                }
                        }
                        if(pickPokemonMoves.length===4){
                                displayMoves(pickPokemonMoves);
                                
                                resolve();
                                return firstPokemon = e
                                
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




   
   





