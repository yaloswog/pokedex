const pokedex = document.getElementById("pokedex");

console.log(pokedex);

const fetchPokemon = () => {

    const promises = [];

    for (let i = 152; i <= 251; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        const pokemon = results.map((data) =>({
            name: data.name,
            id: data.id,
            image: data.sprites['front_shiny'],
            back_image: data.sprites['back_shiny'],
            type: data.types.map((type) => type.type.name).join(', '),
            ability: data.abilities.map((ability) => ability.ability.name).join(', '),
            height: data.height,
            weight: data.weight,
        }))
        displayPokemon(pokemon)
    }) 
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokeman => `
    <li class="card" >
    <div class="card-front">
        <img class="card-image" src="${pokeman.image}"/>
        <img class="card-back-image" src="${pokeman.back_image}"/>
        <h2 class="card-title">${pokeman.name} (${pokeman.id} / 251)</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
        <p class="card-subtitle">Abilities: ${pokeman.ability}</p>
        <p class="card-subtitle">Height: ${pokeman.height}dm Weight: ${pokeman.weight}hg</p>
    </div>
    </li>
    `)
        .join('');
    pokedex.innerHTML = pokemonHTMLString;   
};

fetchPokemon();

function myFunction() {
    var input, filter, ol, li, h2, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ol = document.getElementById("pokedex");
    li = ol.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h2")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
