/**
 * Trie or prefix tree
 * Arbre binaire de recherche
 */
class Trie {
  /**
   * Init tree
   */
  constructor() {
    this.root = {};
  }

  /**
   * Insert word in our tree with id at edge/leaf
   * @param {string} word Text word from document
   * @param {integer} docId Document id
   */
  add(word, docId) {
    const id = parseInt(docId);
    let node = this.root;
    let wordLen = word.length;
    for (let i = 0; i < wordLen; i++) {
      let char = word[i];

      if (!node[char]) node[char] = { ...node[char] };

      if (i === wordLen - 1) {
        node[char].end = node[char].end ? [...node[char].end, id] : [id];
      }

      node = node[char];
    }
  }

  /**
   * Find and collect all ids at edge/leaf
   * @param {string} prefix Prefix
   * @returns {array} Array collection of recipes IDs
   */
  find(prefix) {
    let bag = [];
    let node = this.root;
    const prefixLen = prefix.length;
    for (let i = 0; i < prefixLen; i++) {
      if (!node[prefix[i]]) break;
      node = node[prefix[i]];
    }

    if (node) this.#getLeaves(node, bag);
    return [...new Set(bag)];
  }

  /**
   * Recursive function to traverse node until found leaves
   * @param {object} node Current node from tree
   * @param {array} arr Collected ids
   */
  #getLeaves(node, arr) {
    Object.keys(node).forEach((key) => {
      if (typeof node[key] === "number") return arr.push(node[key]);
      this.#getLeaves(node[key], arr);
    });
  }

  /**
   * Index a document's text paragraph with its id in our tree
   * @param {string} text A text paragraph
   * @param {integer} id Document id
   */
  addText(text, id) {
    const p = this.#preprocess(text);
    p.forEach((w) => this.add(w, id));
  }

  /**
   * Split a text into an array of tokens/words
   * @param {string} longString
   * @returns {array} Array of strings split
   */
  #preprocess(longString) {
    return [
      ...new Set(
        longString
          .toLowerCase()
          .split(" ")
          .filter((w) => w.length > 3)
      ),
    ];
  }
}

export default Trie;
