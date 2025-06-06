const pokemonList = document.getElementById("pokemonList")
const loadMore = document.getElementById("loadMore")
const filterByType = document.getElementById("typeFilter")
const reset = document.getElementById("menu")
const maxRecords = 251
const limit = 8
let offset = 0
let loadedPokemons = []

getPokemonList = (pokemons) => {
    loadedPokemons = loadedPokemons.concat(pokemons);
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
                <div class="stats">
                <button id="details-btn" class="details-btn ${pokemon.type}" data-id="${pokemon.id}">+</button>
                </div
            </li>
    `       
        ).join('')
        pokemonList.innerHTML += newHTML
}

loadPokemonItens =(offset, limit)=>{
    pokeApi.getPokemons(offset,limit).then((pokemons=[])=>{
        return getPokemonList(pokemons)
    })
}
getPokemonsByType=(type, offset,limit)=>{
    pokeApi.getPokemonsByType(type).then((pokemons=[])=>{
    const filtered = pokemons.filter(pokemon => pokemon.id >= 1 && pokemon.id <= 251)
    return getPokemonList(filtered)
    })
}
loadTypes=()=>{
    const gen1and2Types = [
        "normal", "fire", "water", "electric", "grass", "ice",
        "fighting", "poison", "ground", "flying", "psychic",
        "bug", "rock", "ghost", "steel", "dragon"
    ];
    pokeApi.getPokemonTypes().then((types)=>{
        const filteredTypes = types.filter(t => gen1and2Types.includes(t.name));
        const newOptions = filteredTypes.map((t)=>
            `<option class="options" value="${t.name}">${t.name}</option>`
        ).join('')
        filterByType.innerHTML += newOptions
    })
}
filterByType.addEventListener('change', (event)=>{
    const selectedType = event.target.value;
    pokemonList.innerHTML = ''
    if(selectedType ===""){
        offset = 0
        loadPokemonItens(offset, limit)
        loadMore.classList.remove('remove')
    }
    else{
        offset = 0
        getPokemonsByType(selectedType)
        loadMore.classList.add('remove')
    
    }
})
loadPokemonItens(offset, limit)
loadTypes()

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
reset.addEventListener('click', ()=>{
    pokemonList.innerHTML = ''
    offset = 0
    loadPokemonItens(offset, limit)
    filterByType.value = ''
    loadMore.classList.remove('remove')
})
