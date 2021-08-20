import Component from "../../helpers/component";
import dataStore from "../../stores/dataStore";
import ingredientStore from "../../stores/ingredientStore";
import searchStore from "../../stores/searchStore";

class Ingredients extends Component {
  constructor(selector) {
    super(selector);
  }

  events() {
    this.selector.addEventListener("click", (event) => {
      if (event.target.classList.contains("dropdown-item")) {
        const value = event.target.dataset.value;
        searchStore.setState((oldState) => ({
          ...oldState,
          keywords: [...oldState.keywords, { type: "ingredient", value }],
        }));
      }
    });

    this.selector.previousElementSibling.addEventListener("input", (event) => {
      ingredientStore.setState(() => ({ value: event.target.value }));
    });
  }

  render() {
    const { recipes } = dataStore.getState();
    const { value } = ingredientStore.getState();
    let ingredients = [
      ...recipes.reduce((all, recipe) => {
        recipe.ingredients.forEach((i) => all.add(i.ingredient.toLowerCase()));
        return all;
      }, new Set()),
    ];

    if (value !== "") {
      ingredients = ingredients.filter((i) => i.indexOf(value) !== -1);
    }

    return ingredients
      .map(
        (u) =>
          `<li><button class="dropdown-item" data-value="${u}">${u}</button></li>`
      )
      .join("");
  }
}

export default Ingredients;
