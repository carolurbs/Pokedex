const pokeApi = {}
pokeApi.getPokemons =(offset=0, limit=10)=> {
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response)=> response.json())
        .then ((pokemon))
}
convertApi=(pokeDetail)=>{
    const pokemon = new Pokemon()
    pokemon.id=pokemon.id
    pokemon.name=pokeDetail.name
    pokemon.type=pokeDetail.types.map

}