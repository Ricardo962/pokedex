const pokemonLista = document.querySelector('.pokemons');
const loadingPokemons = document.getElementById('loadingMoreButton')
const tema = document.querySelector('.alterar-tema')
const limit = 10;
let offset = 0;
const maxRecorder = 151;

function converterPokemonToLi(pokemon) {
    return `
        <li class="${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="details">
                <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadingPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(converterPokemonToLi).join('')
        pokemonLista.innerHTML += newHtml
    })
}
loadingPokemonItens(offset, limit);

loadingPokemons.addEventListener('click', () => {
    offset += limit
    const qtdRecorderNewPage = offset + limit;

    if (qtdRecorderNewPage >= maxRecorder) {
        const newLimiter = maxRecorder - offset;
        loadingPokemonItens(offset, newLimiter);

        loadingPokemons.parentElement.removeChild(loadingPokemons)
    }

    loadingPokemonItens(offset, limit);
})

function alterarTema() {
    const body = document.querySelector('body')
    const iconAlterarTema = document.querySelector('.alterar-tema img')

    if (body.classList.contains('active')) {
        body.classList.remove('active')
        iconAlterarTema.setAttribute('src', 'assets/img/lua-cheia.png')   
    }
    else {
        body.classList.add('active')
        iconAlterarTema.setAttribute('src', 'assets/img/sun.png')   
    }

}
