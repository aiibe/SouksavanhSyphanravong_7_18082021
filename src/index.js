// Styles
import "./scss/main.scss";

// Stores
import dataStore from "./stores/dataStore";

// Components
import Recipes from "./components/Recipes";

// Fetch data and hydrate store
async function hydrate() {
  const res = await fetch("/api/data.json");
  const data = await res.json();
  dataStore.setState(() => data);
}

// Start
async function start() {
  hydrate();
  const recipes = new Recipes(".recipes");
  dataStore.subscribe(recipes);
}

start();
