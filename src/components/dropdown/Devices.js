import Component from "../../helpers/component";
import dataStore from "../../stores/dataStore";
import searchStore from "../../stores/searchStore";
import deviceStore from "../../stores/deviceStore";

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
          keywords: [...oldState.keywords, { type: "device", value }],
        }));
      }
    });

    this.selector.previousElementSibling.addEventListener("input", (event) => {
      deviceStore.setState(() => ({ value: event.target.value }));
    });
  }

  render() {
    const { recipes } = dataStore.getState();
    let devices = [
      ...recipes.reduce(
        (all, recipe) => all.add(recipe.appliance.toLowerCase()),
        new Set()
      ),
    ];

    const { value } = deviceStore.getState();
    if (value) {
      devices = devices.filter((d) => d.indexOf(value) !== -1);
    }

    return devices
      .map(
        (u) =>
          `<li><button class="dropdown-item" data-value="${u}">${u}</button></li>`
      )
      .join("");
  }
}

export default Devices;
