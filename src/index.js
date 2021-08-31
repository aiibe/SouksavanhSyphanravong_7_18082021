// Styles
import "./scss/main.scss";

// Stores
import dataStore from "./stores/dataStore";
import searchStore from "./stores/searchStore";
import ingredientStore from "./stores/ingredientStore";
import deviceStore from "./stores/deviceStore";
import ustensilStore from "./stores/ustensilStore";

// Components
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import { Ustensils, Devices, Ingredients } from "./components/dropdown";
import Keywords from "./components/Keywords";

// Trie
import tree from "./tree";

// Fetch data and hydrate store
async function hydrate() {
  const res = await fetch("/api/data.json");
  const data = await res.json();
  /**
   * For each recipe, add textSearch field with
   * its data converted into one long string
   */
  data.recipes.forEach((recipe) => {
    let stringIngredients = recipe.ingredients
      .map((i) => i.ingredient)
      .join(" ");
    let stringUstensils = recipe.ustensils.join(" ");
    let textSearch = `${recipe.name} ${recipe.description} ${stringIngredients} ${stringUstensils} ${recipe.appliance}`;
    recipe.textSearch = textSearch.toLowerCase();

    // Indexing each recipe information in our tree
    tree.addText(textSearch, recipe.id);
  });

  // Update data store
  dataStore.setState(() => data);
}

/**
 * Hydrate store
 * Initialize components
 * Subscribe components to reactive stores
 */
async function start() {
  await hydrate();

  new Search(".search");

  const keywords = new Keywords(".keywords");
  searchStore.subscribe(keywords);

  const menuDevices = new Devices(".menu-devices");
  deviceStore.subscribe(menuDevices);
  dataStore.subscribe(menuDevices);

  const menuIngredients = new Ingredients(".menu-ingredients");
  dataStore.subscribe(menuIngredients);
  ingredientStore.subscribe(menuIngredients);

  const menuUstensils = new Ustensils(".menu-ustensils");
  dataStore.subscribe(menuUstensils);
  ustensilStore.subscribe(menuUstensils);

  const recipes = new Recipes(".recipes");
  dataStore.subscribe(recipes);
  searchStore.subscribe(recipes);
}

// Launch app
start();
