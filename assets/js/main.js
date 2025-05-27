convertPokemonTypes=(pokemonTypes)=>{
    return pokemonTypes.map((typeSlot)=>`<li class="type">${typeSlot.type.name}</li>`)
}

convertPokemonToHTML =(pokemon) => {
    return `
    <li class="pokemon">
                <span class="number">#00${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="details">
                    <ol class="types">
                        ${convertPokemonTypes(pokemon.types).join('')}
                    </ol>
                    <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                </div>
            </li>
    `
}
const pokemonList = document.getElementById("pokemonList")



pokeApi.getPokemons().then((pokemons=[])=>{
    pokemonList.innerHTML += pokemons.map(convertPokemonToHTML).join('')
})
    
    