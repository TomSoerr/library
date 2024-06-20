class Helper {
  /**
   * Stores the main HTMLElement
   * @type {HTMLElement}
   */
  static main = null;

  /**
   * Stores the modal HTMLElement
   * @type {HTMLElement}
   */
  static modal = null;

  static dialog = null;

  static updateModal(content) {
    Helper.modal.append(content);
    Helper.dialog.showModal();
  }

  /**
   * Removes Content from the modal
   * @returns {void}
   */
  static closeModal() {
    if (Helper.modal) {
      while (Helper.modal.firstChild) {
        Helper.modal.removeChild(Helper.modal.firstChild);
      }
    }
    Helper.dialog.close();
  }

  /**
   * Stores the current page object
   * @type {Object}
   */
  static currentPage = null;

  /**
   * This will update the main element with the page object
   * @param {Object} page - The page object to load
   */
  static updateMain(page) {
    // Prevent loading the same page
    if (Helper.currentPage !== page) {
      // Check if this is the initial load
      if (Helper.currentPage) {
        // Remove all the children of the main element
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
  static async loadDatabase() {
    const rawData = await window.electron.fetchAllData();
    if (!rawData) return [];
    const dataValues = rawData.map((item) => item.dataValues);
    return dataValues;
  }

  static dataChangeFns = [];

  static addDataChangeFn(fn) {
    Helper.dataChangeFns.push(fn);
  }

  static callDataChangeFn() {
    Helper.dataChangeFns.forEach((fn) => fn());
  }

  static async saveOrCreate(e) {
    e.preventDefault();
    const formEl = e.target.closest('form');
    if (formEl.checkValidity() === false) {
      formEl.reportValidity();
      return;
    }
    const formData = new FormData();

    Array.from(formEl.elements).forEach((element) => {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.type === 'checkbox') {
          formData.append(element.name, element.checked ? 'on' : '');
        } else if (element.value) {
          formData.append(element.name, element.value);
        }
      }
    });

    const data = Object.fromEntries(formData.entries());
    await window.electron.saveData(formEl.dataset.id, data);

    Helper.callDataChangeFn();
    Helper.closeModal();
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
   * @param {Array|HTMLElement} children - The children of the element
   * @returns {HTMLElement} - The created element
   */
  static createElement(element, children) {
    // Destructuring emmet style string
    const tag = element.match(/^[a-z\d]+/)[0];
    const idMatch = element.match(/#([\w-]+)/);
    const id = idMatch ? idMatch[1] : null;
    let classes = element.match(/\.[\w-]+/g) || [];
    let textContent = element.match(/{[^}]+}/);
    let attr = element.match(/\[.+\]/);

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
      // Remove first and last character
      attr = attr[0].slice(1, -1);
      // Split the attributes by comma
      attr = attr.split('::').reduce((acc, cur) => {
        // split first at the first = sign
        const [key, value] = cur.split(/=(.+)/);
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
        newEl.setAttribute(key, value);
      });
    }

    // Add children to the element
    if (children) {
      if (!Array.isArray(children)) {
        newEl.append(children);
      } else {
        // Filter out the falsy children especially the empty strings
        const truthyChildren = children.filter((child) => child);
        newEl.append(...truthyChildren);
      }
    }

    return newEl;
  }
}

const _ = Helper.createElement;

export { Helper as default, _ };
