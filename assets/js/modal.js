const modal = document.getElementById("modal");
getPokemon = (pokemon)=>{
    modal.innerHTML =
    `<div class="modal-container ${pokemon.type}">
                <div class="modal-header">
                    <span id="close-btn" class="close-btn ${pokemon.type}"><i class="fa-solid fa-xmark"></i></span>
                    <span class="modal-name">${pokemon.name}</span>
                    <span class="number">#${pokemon.id}</span>
                </div>
                <div class="modal-content">
                    <img class="pokemon-img" src="${pokemon.photo}" alt="${pokemon.name}">
                    <div class="modal-info">
                        <div class="tags-container">
                            <h3>Type</h3>
                            <ol class="tags">
                                ${pokemon.types.map((type)=>`<li class="modal-tag ${type}">${type}</li>`).join('')}                            </ol>
                        </div>
                        <div class ="tags-container">
                            <h3>Power</h3>
                            <ol class="tags">
                                ${pokemon.abilities.map((ability)=>`<li class="modal-tag ${pokemon.type}">${ability}</li>`).join('')}                            </ol>

                            </ol>
                        </div>
                    </div>
                </div>
            </div>`  
    }



document.addEventListener('click', function(event) {
if (event.target.id === 'details-btn') {
const pokemonId = event.target.getAttribute('data-id');
        const pokemon = loadedPokemons.find(p => p.id == pokemonId);
        if (pokemon) {
            getPokemon(pokemon);
            modal.classList.add('show-modal');
        }   
}
});

closeModal =()=>{
    modal.classList.remove('show-modal');
}
document.addEventListener('click', function(event) {
    if(event.target.id ==="close-btn"|| event.target.id === "modal"){
        closeModal()
    }
});