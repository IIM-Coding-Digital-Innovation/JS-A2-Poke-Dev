const base = 'https://pokeapi.co/api/v2/'

const butt = document.getElementById("button")
const pok = document.getElementById("poke")
const main = document.getElementById('main')
const place = document.getElementById('droptarget')

var colors = ['black', 'blue', 'brown', 'gray', 'green', 'pink', 'purple', 'red', 'white', 'yellow']
function ran(num) {
    return Math.floor(Math.random() * num) + 1
}
let i = 0
let p = 12

butt.addEventListener("click", () => {

    if (i == 6) {
        butt.disabled = true
        pok.innerHTML = `fin`
    } else {
        i += 1

        p -= 2        
        document.getElementById("affichage").innerHTML = p

        let t = ran(1010)
    
        fetch(base + 'pokemon/' + t)
        .then(response => response.json())
        .then(data => {
            // console.log(data.types.length)
            // console.log(data)
            if (data.sprites['front_default']) {
                pok.innerHTML = data.name + `<br> <img draggable="true" id="dragtarget` + data.id + `" src="` + data.sprites['front_default'] + `">`
            } else {
                pok.innerHTML = `<img src="img/loser.png">`
            }
    
        })
    }

})

/* Event fired on the drag target */
document.ondragstart = function(event) {
    event.dataTransfer.setData("Text", event.target.id)
};

/* Events fired on the drop target */
document.ondragover = function(event) {
    event.preventDefault();
};

document.ondrop = function(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data)) 
    if (event.target) {
        event.target.style.opacity = "1"
    }
}
   
// var tabCol = []
// var tab = []
// fetch(base + 'pokemon-color')
// .then(response => response.json())
// .then(data => {
//     console.log(data.results)
// })
// console.log(colors)