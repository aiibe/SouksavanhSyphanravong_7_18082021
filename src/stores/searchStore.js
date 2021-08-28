import Store from "../helpers/store";

/**
 * Hold main search input value and keywords selected
 */
const searchStore = new Store({ value: "", keywords: [] });

export default searchStore;
