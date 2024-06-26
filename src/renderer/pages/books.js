import Helper, { _ } from '../helper';
import Nav from '../modules/nav/nav';
import Table from '../modules/table/table';
import chip from '../modules/chip/chip';
import searchChip from '../modules/search/search';

/**
 * Books page object.
 * This module contains the logic for the filtering and sorting of the table
 */
const Books = (() => {
  // Chips for filtering
  const allBooksChip = chip({
    type: 'radio',
    label: 'Alle Bücher',
    name: 'order',
    icon: '\\eb32',
    checked: true,
  });

  const gelesenChip = chip({
    type: 'radio',
    label: 'Gelesen',
    name: 'order',
    icon: '\\f53e',
  });

  const ungelesenChip = chip({
    type: 'radio',
    label: 'Ungelesen',
    name: 'order',
    icon: '\\e0e0',
  });

  const favoritChip = chip({
    type: 'radio',
    label: 'Favorit',
    name: 'order',
    icon: '\\e87d',
  });

  const leseexemplarChip = chip({
    type: 'radio',
    label: 'Leseexemplar',
    name: 'order',
    icon: '\\e8b1',
  });

  const verliehenChip = chip({
    type: 'radio',
    label: 'Verliehen',
    name: 'order',
    icon: '\\e7fd',
  });

  // Variables for the current order and filter
  let currentOrder = 'def';
  let currentFilter = 'def';

  /**
   * @param {("def"|"fav"|"exp"|"ver"|"ung"|"gel")} filter
   * @param {("def"|"tit"|"gen"|"spi-desc"|"spi-asc"|"bew-desc"|"bew-asc")} order
   */
  const loadTable = async (filter = null, order = null) => {
    // update variables if input is defined
    if (order !== null) {
      currentOrder = order;
    }
    if (filter !== null) {
      currentFilter = filter;
    }

    // load database
    const data = await Helper.loadDatabase(currentFilter, currentOrder);

    // update the table
    Table.loadTable(data);
  };

  /**
   * load() will be called when tab changes
   */
  const load = () => {
    // Add table to the main element and load with default data
    Helper.main.append(
      _('h1', "Kiara's Bücherwelt"),
      _('form.table-controls', [
        _('div.chips-row', [
          allBooksChip,
          gelesenChip,
          ungelesenChip,
          favoritChip,
          leseexemplarChip,
          verliehenChip,
          searchChip.HTMLElement,
        ]),
      ]),
      Table.HTMLElement,
    );
    loadTable();

    Nav.removeActive();
    Nav.books.classList.add('active');
  };

  /**
   * Remove all classes from the order buttons
   */
  const removeAllActive = () => {
    [
      Table.titel,
      Table.spice,
      Table.bewertung,
      Table.genre,
      Table.filter,
    ].forEach((el) => {
      el.classList.remove('active');
      el.classList.remove('asc');
    });
  };

  // Set up listeners

  // Load table with respective filter
  allBooksChip.addEventListener('change', () => loadTable('def'));
  gelesenChip.addEventListener('change', () => loadTable('gel'));
  ungelesenChip.addEventListener('change', () => loadTable('ung'));
  favoritChip.addEventListener('change', () => loadTable('fav'));
  leseexemplarChip.addEventListener('change', () => loadTable('exp'));
  verliehenChip.addEventListener('change', () => loadTable('ver'));

  // Load table with search input as filter
  searchChip.button.addEventListener('change', () => {
    loadTable(searchChip.input.value);
    if (searchChip.button.checked === false) {
      searchChip.button.checked = true;
    }
  });

  // trigger search when radio is clicked again
  searchChip.button.addEventListener('click', () => {
    if (searchChip.button.checked === true) {
      searchChip.button.dispatchEvent(new Event('change'));
    }
  });

  // trigger search when enter is pressed
  searchChip.input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      // prevent the form from submitting
      // otherwise the page will reload
      event.preventDefault();

      searchChip.button.dispatchEvent(new Event('change'));
    }
  });

  // Callback for sorting
  const callback = (e, order) => {
    const orderType = order.split('-')[0];
    let el = e.target;
    if (order === 'def' && el.tagName !== 'BUTTON') {
      el = el.parentElement;
    }
    if (
      (orderType === 'spi' || orderType === 'bew') &&
      el.classList.contains('active')
    ) {
      if (el.classList.contains('asc')) {
        el.classList.remove('asc');
        loadTable(null, order);
      } else {
        el.classList.add('asc');
        loadTable(null, `${orderType}-asc`);
      }
    } else if (!el.classList.contains('active')) {
      removeAllActive();
      el.classList.add('active');
      loadTable(null, order);
    }
  };

  // Load table with respective order
  Table.titel.addEventListener('click', (e) => callback(e, 'tit'));
  Table.genre.addEventListener('click', (e) => callback(e, 'gen'));
  Table.spice.addEventListener('click', (e) => callback(e, 'spi-desc'));
  Table.bewertung.addEventListener('click', (e) => callback(e, 'bew-desc'));
  Table.filter.addEventListener('click', (e) => callback(e, 'def'));

  // Books page should be loaded when tab is pressed
  Nav.books.addEventListener('click', () => Helper.updateMain(Books));

  // Table should be reloaded if database changes
  Helper.addDataChangeFn(loadTable);

  return { load };
})();

export default Books;
