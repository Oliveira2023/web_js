
const pokeapi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.id = pokeDetail.id
    const types = pokeDetail.types.map(types => types.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.abilities = pokeDetail.abilities
    // console.log(pokemon)
    return pokemon;
}

pokeapi.getDetails = (pokemon) => {
    
    return fetch(pokemon.url)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon)  
}

pokeapi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(pokemons => pokemons.map(pokeapi.getDetails))
    .then(promises => Promise.all(promises))
    .then(pokemonsDetails => pokemonsDetails)
}
