class Store {
  constructor(state) {
    this.subscribers = [];
    this.state = state || {};
  }

  #refresh() {
    this.subscribers.forEach((sub) => sub.refresh());
  }

  subscribe(component) {
    this.subscribers = [...this.subscribers, component];
  }

  getState() {
    return this.state;
  }

  setState(cb) {
    this.state = cb(this.state);
    this.#refresh();
  }
}

export default Store;
