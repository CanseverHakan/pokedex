const pokemonContainer = document.querySelector('.pokemonContainer')
const btn = document.querySelector('.next')
const btnb = document.querySelector('.previous')
const btnS = document.querySelector('.btnSearch')

const getJSON = async (url, errorMsg = 'Something went Wrong') => {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`${errorMsg} (${res.status})`)
    }
    return await res.json()
}


const pokedex = function (data) {

    const html = `
    <div class="pokemonContainer">
        <div class="pokemon ${data.types[0].type.name}">
            <div class="imgContainer">
                <img src="${data.sprites.front_default}" alt="${data.name}">
            </div>
            <div class="info">
                <h3 class="name">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
                <span class="type">Type: <span>${data.types[0].type.name}</span></span>
            </div>
        </div>
    </div>`;

    pokemonContainer.insertAdjacentHTML("beforeend", html)
}


let startIndex = 1;
let endIndex =15


const getPokemon = async function (i) {
    try {
        const pokemons = await getJSON(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokedex(pokemons)
        return pokemons

        
    } catch (error) {
        console.error(error);
    }
}

let i = startIndex
while (i < endIndex) { 
    getPokemon(`${i}`)
    i++
}


btn.addEventListener('click', function () {
    // Mise a jour
    startIndex += 15;
    endIndex += 15;

    while (i < endIndex) { 
        getPokemon(`${i}`)
        i++
    }

    // Supprime les anciens Pokémon
    while (pokemonContainer.firstChild) {
        pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    getPokemon(`${i}`)
})

btnb.addEventListener('click', function () {
    // Mise a jour
    startIndex -= 15;
    endIndex -= 15;

    while (i > endIndex) { 
        getPokemon(`${i}`)
        i--
    }

    // Supprime les anciens Pokémon
    while (pokemonContainer.firstChild) {
        pokemonContainer.removeChild(pokemonContainer.firstChild);
    }

    getPokemon(`${i}`)
})

btnS.addEventListener('click', function () {
    const inputSearch = document.querySelector('.search').value.toLowerCase()
    pokemonContainer.innerHTML = ''
        getPokemon(`${inputSearch}`)

})



