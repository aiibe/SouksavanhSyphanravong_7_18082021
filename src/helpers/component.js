/**
 * Component can subscribe to any stores and re-render
 */
class Component {
  /**
   * Find a selector, render content and bind events
   * @param {string} selector DOM query selector string
   */
  constructor(selector) {
    this.type = "component";
    this.selector = document.querySelector(selector);
    this.refresh();
    this.after();
    this.events();
  }

  /**
   * Call anytime a store has changed if the component is a subscriber.
   */
  refresh() {
    // Clean up DOM
    while (this.selector.firstChild) {
      this.selector.removeChild(this.selector.lastChild);
    }

    // Apply changes to DOM
    this.selector.insertAdjacentHTML("beforeend", this.render());
  }

  /**
   * Bind events listeners, usually on the selector/parent
   * element via Event Delegation.
   * It will run once.
   */
  events() {}

  /**
   * Provide a custom markup and render to DOM.
   * Should return a string or template literal.
   */
  render() {}

  /**
   * Execute other things after first render to DOM
   */
  after() {}
}

export default Component;
