// Styles
import "./scss/main.scss";

// Stores
import dataStore from "./stores/dataStore";
import searchStore from "./stores/searchStore";
import ingredientStore from "./stores/ingredientStore";

// Components
import Recipes from "./components/Recipes";
import Search from "./components/Search";
import { Ustensils, Devices, Ingredients } from "./components/dropdown";
import Keywords from "./components/Keywords";
import deviceStore from "./stores/deviceStore";
import ustensilStore from "./stores/ustensilStore";

// Fetch data and hydrate store
async function hydrate() {
  const res = await fetch("/api/data.json");
  const data = await res.json();
  dataStore.setState(() => data);
}

// Start
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
}

start();
