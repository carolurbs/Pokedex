
convertPokemonToHTML =(pokemon) => {
    return `
    <li class="pokemon ${pokemon.type}">
                <span class="number">#00${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `
}
const pokemonList = document.getElementById("pokemonList")



pokeApi.getPokemons().then((pokemons=[])=>{
    pokemonList.innerHTML += pokemons.map(convertPokemonToHTML).join('')
})
    
    