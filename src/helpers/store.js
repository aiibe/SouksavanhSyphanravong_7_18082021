/**
 * Reactive store (Observer pattern)
 */
class Store {
  /**
   * Initialize state
   * @param {object} state Initial state object
   */
  constructor(state) {
    this.subscribers = [];
    this.state = state || {};
  }

  /**
   * Private
   * Make all subscribers components re-render
   */
  #refresh() {
    this.subscribers.forEach((sub) => sub.refresh());
  }

  /**
   * Subscribe a component to this store
   * @param {object} component Component reference
   */
  subscribe(component) {
    this.subscribers = [...this.subscribers, component];
  }

  /**
   * Get current state
   * @returns {object} Current state
   */
  getState() {
    return this.state;
  }

  /**
   * Update state with new values
   * and re-render components
   * @param {function} cb Callback
   */
  setState(cb) {
    this.state = cb(this.state);
    this.#refresh();
  }
}

export default Store;
