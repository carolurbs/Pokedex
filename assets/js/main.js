const pokemonList = document.getElementById("pokemonList")
const loadMore = document.getElementById("loadMore")
const maxRecords = 251
const limit = 20
let offset = 0

pokeApi.getPokemons().then((pokemons=[])=>{
    pokemonList.innerHTML += pokemons.map(convertPokemonToHTML).join('')
})

loadPokemonItens =(offset, limit)=>{
    pokeApi.getPokemons(offset,limit).then((pokemons=[])=>{
        const newHTML=pokemons.map((pokemon)=>
            `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type)=>`<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
    `
        
        ).join('')
        pokemonList.innerHTML += newHTML
    })
}
loadPokemonItens(offset, limit)
loadMore.addEventListener('click', ()=>{
    offset += limit
    const records = offset + limit
    if(records >= maxRecords){
        const newLimit = maxRecords-offset
            loadPokemonItens(offset, newLimit)
            loadMore.classList.add('remove')
    }
    else{
        loadPokemonItens(offset, limit)
    }
})  