import CharacterCard from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

const getAllCharactersUrl = "https://rickandmortyapi.com/api/character";

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

// simulate data
let results = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/1",
  },
  location: {
    name: "Earth",
    url: "https://rickandmortyapi.com/api/location/20",
  },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    // ...
  ],
  url: "https://rickandmortyapi.com/api/character/1",
  created: "2017-11-04T18:48:46.250Z",
};
// ...
// Render
// cardContainer.append(CharacterCard(results));

async function fetchCharacters(url) {
  const response = await fetch(url);
  if (!response.ok) {
    console.log("Network error");
    return null;
  }
  try {
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log("Parsing error", error);
  }
}

async function renderCards(url) {
  console.log("render", url);
  cardContainer.innerHTML = "";
  results = await fetchCharacters(url);
  results.forEach((character) => {
    cardContainer.append(CharacterCard(character));
  });
}

renderCards(getAllCharactersUrl);

//Search
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchBar.query.value.toLowerCase();
  const searchUrl = `${getAllCharactersUrl}/?name=${query}`;
  console.log(searchUrl);
  renderCards(searchUrl);
});
