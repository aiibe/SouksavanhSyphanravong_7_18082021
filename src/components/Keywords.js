import Component from "../helpers/component";
import searchStore from "../stores/searchStore";

class Keywords extends Component {
  constructor(selector) {
    super(selector);
  }

  events() {
    this.selector.addEventListener("click", (event) => {
      if (event.target.classList.contains("keyword")) {
        const value = event.target.dataset.value;
        searchStore.setState((oldState) => ({
          ...oldState,
          keywords: oldState.keywords.filter((k) => k.value !== value),
        }));
      }
    });
  }

  render() {
    const { keywords } = searchStore.getState();
    return keywords
      .map((word) => {
        switch (word.type) {
          case "ingredient":
            return `
            <li>
              <button data-value="${word.value}" class="keyword btn keyword--ingredient">
                ${word.value}<i class="bi bi-x-circle"></i>
              </button>
            </li>
            `;
          case "device":
            return `
            <li>
              <button data-value="${word.value}" class="keyword btn keyword--device">
              ${word.value}<i class="bi bi-x-circle"></i>
              </button>
            </li>
            `;
          case "ustensil":
            return `
            <li>
              <button data-value="${word.value}" class="keyword btn keyword--ustensil">
              ${word.value}<i class="bi bi-x-circle"></i>
              </button>
            </li>
            `;
          default:
            return ``;
        }
      })
      .join("");
  }
}

export default Keywords;
