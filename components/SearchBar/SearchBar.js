export default function SearchBar() {
  const searchbar = document.createElement("form");
  searchbar.classList.add("search-bar");
  searchbar.setAttribute("data-js", "search-bar");
  searchbar.innerHTML = `
    <input
            name="query"
            class="search-bar__input"
            type="text"
            placeholder="search characters"
            aria-label="character name"
          />
          <button class="search-bar__button" aria-label="search for character">
            <img
              class="search-bar__icon"
              src="assets/magnifying-glass.png"
              alt=""
            />
          </button>`;

  return searchbar;
}
