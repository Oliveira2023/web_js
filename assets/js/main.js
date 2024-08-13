let offset = 0;
let limit = 5;
let maxRecords = 151;

const pokemonList = document.querySelector('.pokemons');
const loadMoreButton = document.querySelector('#loadMoreButton');
const pokemonDetailsModal = document.querySelector('.modal');
let objetoArray =[];
function convertTypesToLi(types) {
    return types.map(type => `<li class="type">${type.type.name}</li>`) 

}

function convertPokemonToLi(pokemon) {
    
    return `
            <li class="pokemon ${pokemon.type}" onClick="pokemonDetails(${pokemon.id})">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">  
                        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) =>{ 
        pokemonList.innerHTML += pokemons.map((convertPokemonToLi)).join("")
        })
        .catch(error => console.log(error))
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit
    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function pokemonDetails(id) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(pokemon => {
        // showDetails(pokemon)
            pokemonDetailsModal.innerHTML =`
            <div class="pokemon ${pokemon.type}" onClick=closeModal()>
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">  
                        ${pokemon.types.map((type) => `<li class="type">${type.type.name}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.sprites.front_shiny
}" alt="${pokemon.name}">
                </div>
                <div>
                    <h2>Abilities</h2>
                    <ul>
                        ${pokemon.abilities.map((ability) => `<li>${ability.ability.name}</li>`).join("")}
                    </ul>
                </div>

            </div>
    `
    pokemonDetailsModal.classList.add('open')
    })
}

function closeModal() {
    pokemonDetailsModal.classList.remove('open')
}

