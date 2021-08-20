import Component from "../../helpers/component";
import dataStore from "../../stores/dataStore";
import searchStore from "../../stores/searchStore";
import ustenstilStore from "../../stores/ustensilStore";

class Devices extends Component {
  constructor(selector) {
    super(selector);
  }

  events() {
    this.selector.addEventListener("click", (event) => {
      if (event.target.classList.contains("dropdown-item")) {
        const value = event.target.dataset.value;
        searchStore.setState((oldState) => ({
          ...oldState,
          keywords: [...oldState.keywords, { type: "ustensil", value }],
        }));
      }
    });

    this.selector.previousElementSibling.addEventListener("input", (event) => {
      ustenstilStore.setState(() => ({ value: event.target.value }));
    });
  }

  render() {
    const { recipes } = dataStore.getState();
    let ustensils = [
      ...new Set(
        recipes
          .reduce((all, recipe) => all.concat(recipe.ustensils), [])
          .map((u) => u.toLowerCase())
      ),
    ];

    const { value } = ustenstilStore.getState();

    if (value !== "") {
      ustensils = ustensils.filter((u) => u.indexOf(value) !== -1);
    }

    return ustensils
      .map(
        (u) =>
          `<li><button class="dropdown-item" data-value="${u}">${u}</button></li>`
      )
      .join("");
  }
}

export default Devices;
