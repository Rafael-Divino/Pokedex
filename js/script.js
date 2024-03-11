const pokemonName = document.querySelector('.pokemon_name');
/*document.querySelector serve para buscar um elemento no html*/
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {

    /*await faz que o codigo espere a requisição do fetch ser concluida para serguir para proxima etapa. somente usado em funções asincronas*/
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        /*Pega a resposta da api e transforma em json para extrair seus dados*/
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default
        pokemonImage.style.display = "block"
        searchPokemon = data.id

        input.value = '';//limpa o campo de texto depois de clicar em enviar   
    } else {
        pokemonName.innerHTML = 'Não encontrado :(';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = "none" //oculta a imagem caso não encontre o pokémon
    }

}

form.addEventListener('submit', (e) => {

    e.preventDefault(); //para nao recarregar a pagina toda vez que enviar o formulario
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon)

