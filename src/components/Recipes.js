import Component from "../helpers/component";
import dataStore from "../stores/dataStore";

class Recipes extends Component {
  constructor(selector) {
    super(selector);
  }

  render() {
    const { recipes } = dataStore.getState();
    return recipes.map((recipe) => this.renderCard(recipe)).join("");
  }

  renderCard(recipe) {
    const { name, time, description, ingredients } = recipe;
    return `
      <article class="card recipe__card">
        <img
          class="recipe__image card-img-top"
          src="/placeholder-img.jpg"
          alt="placeholder"
        />
        <div class="recipe__body card-body">
          <div class="recipe__meta d-flex justify-content-between">
            <h6 class="recipe__title card-title">${name}</h6>
            <div class="recipe__time">
              <i class="bi bi-clock"></i>
              <span>${time} min</span>
            </div>
          </div>
          <div class="recipe__info">
            <ul class="recipe__ingredients list-unstyled">
              ${ingredients.map((i) => this.renderIngredient(i)).join("")}
            </ul>
            <p class="recipe__desc">${
              description.length > 160
                ? description.substring(0, 160) + "..."
                : description
            }</p>
          </div>
        </div>
      </article>
    `;
  }

  renderIngredient(i) {
    const { ingredient, quantity, unit } = i;
    return `
      <li class="recipe__ingredient">
        ${ingredient}${this.renderQuantity(quantity, unit)}
      </li>
    `;
  }

  renderQuantity(quantity, unit) {
    return quantity ? `: <span>${quantity}${this.renderUnit(unit)}</span>` : ``;
  }

  renderUnit(unit) {
    if (!unit) return ``;

    switch (unit) {
      case "grammes":
        return "g";
      case "cuillères à café":
        return ` cuillères`;
      case "cuillère à soupe":
        return ` cuillères`;
      case "cuillères à soupe":
        return ` cuillères`;
      case "tranches":
        return ` tranches`;
      case "sachets":
        return ` sachets`;
      case "tasses":
        return ` tasses`;
      case "litres":
        return ` litres`;
      default:
        return unit;
    }
  }
}

export default Recipes;
