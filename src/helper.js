import data from './sampleData.js';

class Helper {
  static main = null;

  /**
   * The static method to load the database
   * @returns {Object} - The database object
   */
  static loadDatabase() {
    return data;
  }

  /**
   * The static elements object to store the created elements
   * @type {Object}
   */
  static elements = {};

  /**
   *
   * @param {String} tag - The HTML tag name of the element
   * @param {Object} param1
   * @param {Object} param1.attr - The attributes of the element
   * @param {Array} param1.children - The children of the element
   * @param {Object[]} param1.event - The type and listener of the event
   * @returns {HTMLElement} - The created element
   */
  static createElement(
    tag,
    { attr = null, children = null, event = null } = {},
  ) {
    // Check if the element is already created
    if (!Helper.elements[tag]) {
      // Create the element if it doesn't exist
      Helper.elements[tag] = document.createElement(tag);
    }

    // Clone the necessary element
    const newEl = Helper.elements[tag].cloneNode(true);

    // Add attributes to the element
    if (attr) {
      Object.entries(attr).forEach(([key, value]) => {
        if (key === 'class') {
          value.split(' ').forEach((className) => {
            newEl.classList.add(className);
          });
        } else if (key === 'text') {
          newEl.textContent = value;
        } else if (key === 'data') {
          if (value) {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
              newEl.dataset[dataKey] = dataValue;
            });
          }
        } else {
          console.log(key, value);
          newEl.setAttribute(key, value);
        }
      });
    }

    // Add children to the element
    if (children) {
      // Filter out the falsy children especially the empty strings
      const truthyChildren = children.filter((child) => child);
      newEl.append(...truthyChildren);
    }

    // Add event to the element
    if (event) {
      // Loop through the event Array
      event.forEach((eObj) => {
        // Add the event listener to the element
        if (eObj) newEl.addEventListener(eObj.type, eObj.listener);
      });
    }

    return newEl;
  }
}

const _ = Helper.createElement;

export { _, Helper as default };
