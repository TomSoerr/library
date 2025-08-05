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
    label: 'Mein Bestand',
    name: 'filter',
    icon: '\\eb32',
    checked: true,
  });

  const gelesenChip = chip({
    type: 'radio',
    label: 'Gelesen',
    name: 'filter',
    icon: '\\f53e',
  });

  const ungelesenChip = chip({
    type: 'radio',
    label: 'Ungelesen',
    name: 'filter',
    icon: '\\e0e0',
  });

  const favoritChip = chip({
    type: 'radio',
    label: 'Favorit',
    name: 'filter',
    icon: '\\e87d',
  });

  const leseexemplarChip = chip({
    type: 'radio',
    label: 'Leseexemplar',
    name: 'filter',
    icon: '\\e8b1',
  });

  const verliehenChip = chip({
    type: 'radio',
    label: 'Verliehen',
    name: 'filter',
    icon: '\\e7fd',
  });

  const geliehenChip = chip({
    type: 'radio',
    label: 'Geliehen',
    name: 'filter',
    icon: '\\ebcb',
  });

  const aussortiertChip = chip({
    type: 'radio',
    label: 'Aussortiert',
    name: 'filter',
    icon: '\\e14a',
  });

  const ebookChip = chip({
    type: 'radio',
    label: 'E-Book',
    name: 'filter',
    icon: '\\e30c',
  });

  // Variables for the current order and filter
  let currentOrder = 'def';
  let currentFilter = 'def';

  /**
   * @param filter
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
      _('form.table-controls', [
        _('div.chips-row', [
          allBooksChip,
          gelesenChip,
          ungelesenChip,
          favoritChip,
          leseexemplarChip,
          verliehenChip,
          geliehenChip,
          aussortiertChip,
          ebookChip,
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
  geliehenChip.addEventListener('change', () => loadTable('gli'));
  aussortiertChip.addEventListener('change', () => loadTable('aus'));
  ebookChip.addEventListener('change', () => loadTable('ebo'));

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

  Table.selectOrder.addEventListener('change', (event) => {
    const selectedOrder = event.target.value;
    loadTable(null, selectedOrder);
  });

  // Books page should be loaded when tab is pressed
  Nav.books.addEventListener('click', () => Helper.updateMain(Books));

  // Table should be reloaded if database changes
  Helper.addDataChangeFn(loadTable);

  return { load };
})();

export default Books;
