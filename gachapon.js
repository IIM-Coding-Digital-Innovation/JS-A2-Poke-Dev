const butt = document.getElementById("button")
const pok = document.getElementById("poke")
const main = document.getElementById('main');

function ran(num) {
    return Math.floor(Math.random() * num) + 1;
}

butt.addEventListener("click", () => {
    let t = ran(1010)
    const API_URL = 'https://pokeapi.co/api/v2/pokemon/' + t ;

    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data.types.length)
        console.log(data)
        if (data.sprites['front_default']) {
            pok.innerHTML = data.name + `<br> <img draggable="true" id="dragtarget` + ran(1010) + `" src="` + data.sprites['front_default'] + `">`
        } else {
            pok.innerHTML = `<img src="img/loser.png">`
        }

    })
})


/* Event fired on the drag target */
document.ondragstart = function(event) {
    event.dataTransfer.setData("Text", event.target.id);
    document.getElementById("demo").innerHTML = "Started to drag the p element.";
  };
  
  /* Events fired on the drop target */
  document.ondragover = function(event) {
    event.preventDefault();
  };
  
  document.ondrop = function(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
  };
