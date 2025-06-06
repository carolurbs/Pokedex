const pokeApi = {}
pokeApi.getPokemons =(offset=0, limit=20)=> {
const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
    .catch((error) => console.error(error))
}
convertApi=(pokeDetail)=>{
    const pokemon = new Pokemon()
    pokemon.id=pokeDetail.id
    pokemon.name=pokeDetail.name
    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability]= abilities
    pokemon.abilities= abilities
    pokemon.ability=ability
    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response)=> response.json())
        .then(convertApi)
}
pokeApi.getPokemonsByType = (type) => {
    const url = `https://pokeapi.co/api/v2/type/${type}`

    return fetch(url)
        .then(response => response.json())
        .then(json => json.pokemon.map(p => p.pokemon))
        .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
        .then(detailRequests => Promise.all(detailRequests))
        .catch(error => {
            console.error(error)
            return []
        });
}
pokeApi.getPokemonTypes = () => {
    const url = "https://pokeapi.co/api/v2/type";

    return fetch(url)
        .then(response => response.json())
        .then(json => json.results)
        .catch(error => {
            console.error(error)
            return []
        });
}
