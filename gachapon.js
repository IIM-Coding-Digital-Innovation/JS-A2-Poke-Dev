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
            pok.innerHTML = data.name + `<br> <img src="` + data.sprites['front_default'] + `">`
        } else {
            pok.innerHTML = `<img src="img/loser.png">`
        }

    })
})