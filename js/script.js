const pokemonShiny = document.querySelector('.pokemon__shiny');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonTypeContainer = document.querySelector('.pokemon__type');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn_prev');
const buttonNext = document.querySelector('.btn_next');

let isShiny = false;
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const resetShinyButton = () => {
    isShiny = false;
    document.querySelector('.pokemon__shiny .default').style.display = 'block';
    document.querySelector('.pokemon__shiny .active').style.display = 'none';
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data && data.id <= 649) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        createPokemonTypes(data.types);

        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
        resetShinyButton();
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
};


const typeColors = {
    fire: '#F57D31', water: '#6493EB', grass: '#74CB48',electric: '#F9CF30', ice: '#9AD6DF', fighting: '#C12239', poison: '#A43E9E', ground: '#DEC16B', flying: '#A891EC', psychic: '#FB5584', bug: '#A7B723', rock: '#B69E31', ghost: '#70559B', dragon: '#7037FF', dark: '#75574C', steel: '#B7B9D0', fairy: '#E69EAC', normal: '#AAA67F'
};

const typeFontColors = {
    fire: '#fff', water: '#fff', grass: '#000', electric: '#000', ice: '#000', fighting: '#fff', poison: '#fff', ground: '#000', flying: '#000', psychic: '#fff', bug: '#000', rock: '#fff', ghost: '#fff', dragon: '#fff', dark: '#fff', steel: '#000', fairy: '#000', normal: '#000'
};

const createPokemonTypes = (types) => {
    pokemonTypeContainer.innerHTML = '';

    const ul = document.createElement('ul');

    types.forEach((typeObj) => {
        const li = document.createElement('li');
        const typeName = typeObj.type.name;
        const formattedTypeName = typeName.charAt(0).toUpperCase() + typeName.slice(1).toLowerCase();
        li.innerHTML = formattedTypeName;
        li.style.backgroundColor = typeColors[typeObj.type.name] || '#ccc';
        li.style.color = typeFontColors[typeObj.type.name] || '#ccc';
        ul.appendChild(li);
    });

    pokemonTypeContainer.appendChild(ul);
};



form.addEventListener('submit', (event) => {
    event.preventDefault();
    let pokemonNumber = input.value.replace(/^0+/, '');
    renderPokemon(pokemonNumber.toLowerCase());
    pokemonShiny.innerHTML = defaultSVG;
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
        pokemonShiny.innerHTML = defaultSVG;
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    pokemonShiny.innerHTML = defaultSVG;
});

const defaultSVG = `<span>Shiny</span><svg width="4.5%" height="4.5%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#3a444d" stroke-width="2"/>
                </svg>`;
const activeSVG = `<span>Shiny</span><svg width="4.5%" height="4.5%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#3a444d"/>
            </svg>
        `;
pokemonShiny.addEventListener('click', async () => {
    const data = await fetchPokemon(searchPokemon);
    if (data) {
        if (isShiny) {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            pokemonShiny.innerHTML = defaultSVG;
        } else {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
            pokemonShiny.innerHTML = activeSVG;
        }
        isShiny = !isShiny;
    }
});

renderPokemon(searchPokemon);