// Coloquei em Portugues
const tipoPokemonMap = {
    fogo: "fire",
    agua: "water",
    grama: "grass",
    eletrico: "electric",
    normal: "normal",
    psiquico: "psychic"
};

// Buscar Pokemon
document.getElementById('pokemon-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('pokemon-name').value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    if (response.ok) {
        document.getElementById('pokemon-data').innerHTML = `
            <h3>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Altura: ${data.height}</p>
            <p>Peso: ${data.weight}</p>
            <p>Habilidades: ${data.abilities.map(a => a.ability.name).join(', ')}</p>
            <p>Tipos: ${data.types.map(t => t.type.name).join(', ')}</p>
        `;
    } else {
        document.getElementById('pokemon-data').innerHTML = '<p>Pokémon não encontrado.</p>';
    }
});

// Regiao para cada Pokemon
const regioesParaGeracao = {
    kanto: 1,
    johto: 2,
    hoenn: 3,
    sinnoh: 4,
    unova: 5,
    kalos: 6,
    alola: 7,
    galar: 8
};

// Buscar por elemento
document.getElementById('search-type-btn').addEventListener('click', async () => {
    const tipo = document.getElementById('pokemon-type').value.toLowerCase();
    const tipoEmIngles = tipoPokemonMap[tipo];

    if (!tipoEmIngles) {
        alert('Tipo inválido!');
        return;
    }

    const response = await fetch(`https://pokeapi.co/api/v2/type/${tipoEmIngles}`);
    const data = await response.json();
    const pokemonList = data.pokemon.slice(0, 10);

    let galleryHTML = '';
    for (const pokemon of pokemonList) {
        const pokemonDetails = await fetch(pokemon.pokemon.url);
        const pokemonData = await pokemonDetails.json();

        galleryHTML += `
            <div class="pokemon-card-container">
                <div class="pokemon-card">
                    <!-- Frente da carta com a imagem do Pokémon -->
                    <div class="pokemon-card-front">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png" alt="${pokemonData.name}">
                        <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
                    </div>
                    <!-- Verso da carta (pode ser qualquer outra imagem ou informação) -->
                    <div class="pokemon-card-back">
                        <img src="imagens/carta.png" alt="Carta">
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById('pokemon-gallery').innerHTML = galleryHTML;
});

// Buscar pokemon por regiao
document.getElementById('search-region-btn').addEventListener('click', async () => {
    const regiao = document.getElementById('pokemon-region').value.toLowerCase();

    if (!regioesParaGeracao[regiao]) {
        alert('Região inválida!');
        return;
    }

    const geracao = regioesParaGeracao[regiao];
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${geracao}`);
    
    if (!response.ok) {
        alert('Erro ao buscar Pokémons dessa região.');
        return;
    }

    const data = await response.json();
    const pokemonList = data.pokemon_species.slice();

    let galleryHTML = '';
    for (const pokemon of pokemonList) {
        const pokemonDetails = await fetch(pokemon.url);
        const pokemonData = await pokemonDetails.json();

        galleryHTML += `
            <div class="pokemon-card-container">
                <div class="pokemon-card">
                    <!-- Frente da carta com a imagem do Pokémon -->
                    <div class="pokemon-card-front">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png" alt="${pokemonData.name}">
                        <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
                    </div>
                    <!-- Verso da carta (pode ser qualquer outra imagem ou informação) -->
                    <div class="pokemon-card-back">
                        <img src="imagens/carta.png" alt="Carta">
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById('pokemon-region-gallery').innerHTML = galleryHTML;
});

