import data from './sampleData.js';

class Helper {
  static main = null;

  static currentPage = null;

  static updateMain(page) {
    if (Helper.currentPage !== page) {
      if (Helper.currentPage) {
        Helper.currentPage.remove();

        while (Helper.main.firstChild) {
          Helper.main.removeChild(Helper.main.firstChild);
        }
      }

      Helper.currentPage = page;
      Helper.currentPage.load();
    }
  }

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
   * Creates HTML elements from string. The string supports the following
   * features: #id, .className, [attr=value,attr=value], {textContent}
   * @param {String} tag - The HTML tag with emmet support
   * @param {Array} children - The children of the element
   * @returns {HTMLElement} - The created element
   */
  static createElement(element, children) {
    // Destructuring emmet style string
    const tag = element.match(/^[a-z]+/)[0];
    const idMatch = element.match(/#([a-z]+)/);
    const id = idMatch ? idMatch[1] : null;
    let classes = element.match(/\.[\w-]+/g) || [];
    let textContent = element.match(/{[^}]+}/);
    let attr = element.match(/\[[^\]]+\]/);

    // Replace the . before the class name
    if (classes) {
      classes = classes.map((className) => className.replace('.', ''));
    }

    // Remove the curly braces
    if (textContent) {
      textContent = textContent[0].replace(/{|}/g, '');
    }

    // Convert the attributes to an object
    if (attr) {
      // Remove the square brackets
      attr = attr[0].replace(/\[|\]/g, '');
      // Split the attributes by comma
      attr = attr.split(',').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        acc[key] = value.slice(1, -1);
        return acc;
      }, {});
    }

    // Check if the element is already created
    if (!Helper.elements[tag]) {
      // Create the element if it doesn't exist
      Helper.elements[tag] = document.createElement(tag);
    }

    // Clone the necessary element
    const newEl = Helper.elements[tag].cloneNode(true);

    // Add text content to the element
    if (textContent) {
      newEl.textContent = textContent;
    }

    // Add id to the element
    if (id) {
      newEl.id = id;
    }

    // Add classes to the element
    if (classes) {
      classes.forEach((className) => {
        newEl.classList.add(className);
      });
    }

    // Add attributes to the element
    if (attr) {
      Object.entries(attr).forEach(([key, value]) => {
        if (key === 'data') {
          if (value) {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
              newEl.dataset[dataKey] = dataValue;
            });
          }
        } else {
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

    return newEl;
  }
}

const _ = Helper.createElement;

export { Helper as default, _ };
