import CharacterCard from "./components/CharacterCard/CharacterCard.js";
import NavButton from "./components/NavButton/NavButton.js";
import NavPagination from "./components/NavPagination/NavPagination.js";
import SearchBar from "./components/SearchBar/SearchBar.js";
// import SearchBar from "./components/SearchBar/SearchBar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = SearchBar();
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = NavButton(
  "previous",
  ["button", "button--prev"],
  "button-prev"
);
const nextButton = NavButton("next", ["button", "button--next"], "button-next");
const pagination = NavPagination();

searchBarContainer.append(searchBar);
navigation.append(prevButton);
navigation.append(pagination);
navigation.append(nextButton);

const getAllCharactersUrl = "https://rickandmortyapi.com/api/character";

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

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
    maxPage = data.info.pages;
    // console.log(maxPage);
    return data.results;
  } catch (error) {
    console.log("Parsing error", error);
  }
}

async function renderCards(url) {
  cardContainer.innerHTML = "";
  results = await fetchCharacters(url);
  if (!results) {
    cardContainer.innerHTML = `<img src="https://i.giphy.com/g7GKcSzwQfugw.webp">
  `;
    pagination.textContent = `RICKED!!`;
    return;
  }
  results.forEach((character) => {
    cardContainer.append(CharacterCard(character));
  });
  pagination.textContent = `${page}/${maxPage}`;
}

renderCards(getAllCharactersUrl);

//Search
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBar.query.value.toLowerCase();
  const searchUrl = `${getAllCharactersUrl}/?name=${searchQuery}`;
  page = 1;
  renderCards(searchUrl);
});

// pagination
prevButton.addEventListener(`click`, () => {
  if (page === 1) {
    page = maxPage;
  } else {
    page--;
  }
  const queryAttribute = searchQuery ? `&name=${searchQuery}` : ``;

  renderCards(`${getAllCharactersUrl}/?page=${page}${queryAttribute}`);
});
nextButton.addEventListener(`click`, () => {
  if (page === maxPage) {
    page = 1;
  } else {
    page++;
  }
  const queryAttribute = searchQuery ? `&name=${searchQuery}` : ``;
  renderCards(`${getAllCharactersUrl}/?page=${page}${queryAttribute}`);
});
