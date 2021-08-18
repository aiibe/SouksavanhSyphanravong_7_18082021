class Component {
  constructor(selector) {
    this.type = "component";
    this.selector = document.querySelector(selector);
    this.render();
    this.after();
    this.events();
  }

  refresh() {
    // Clean up DOM
    while (this.selector.firstChild) {
      this.selector.removeChild(this.selector.lastChild);
    }

    // Apply changes to DOM
    this.selector.insertAdjacentHTML("beforeend", this.render());
  }

  events() {}

  render() {}

  after() {}
}

export default Component;
