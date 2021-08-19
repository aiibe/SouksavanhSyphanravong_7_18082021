import Component from "../helpers/component";
import dataStore from "../stores/dataStore";

class Search extends Component {
  constructor(selector) {
    super(selector);
  }

  events() {
    this.selector.addEventListener("input", (event) => {
      const searchString = event.target.value;
      if (searchString.length > 3) {
        // Search begins here
      }
    });
  }

  render() {
    return `
      <div class="search__box input-group mb-3">
        <input
          type="text"
          class="search__text form-control"
          placeholder="Rechercher un ingrédient, appareil, ustensiles ou une recette"
          aria-label="Rechercher un ingrédient, appareil, ustensiles ou une recette"
          aria-describedby="button-search"
        />
        <button
          id="button-search"
          class="search__button btn"
          type="button"
          role="search"
          aria-label="search"
        >
          <i class="bi bi-search"></i>
        </button>
      </div>
    `;
  }
}
export default Search;
