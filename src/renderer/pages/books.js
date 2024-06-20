import Helper, { _ } from '../helper';
import Nav from '../modules/nav/nav';
import Table from '../modules/table/table';
import chip from '../modules/chip/chip';

const Books = (() => {
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

  let currentOrder = 'def';
  let currentFilter = 'def';

  /**
   * @param {("def"|"fav"|"exp"|"ver"|"ung"|"gel")} filter
   * @param {("def"|"tit"|"gen"|"spi-d"|"spi-i"|"bew-d"|"bew-i")} order
   */
  const loadTable = async (filter = null, order = null) => {
    if (order !== null) {
      currentOrder = order;
    }
    if (filter !== null) {
      currentFilter = filter;
    }

    console.log('filter: ', currentFilter);
    console.log('order: ', currentOrder);

    const data = await Helper.loadDatabase(currentFilter, currentOrder);
    Table.loadTable(data);
  };

  const load = () => {
    // Add table to the main element and load with default data
    Helper.main.append(
      _('h1', 'Kiaras Bücherwelt'),
      _('form.table-controls', [
        _('div.chips-row', [
          allBooksChip,
          gelesenChip,
          ungelesenChip,
          favoritChip,
          leseexemplarChip,
          verliehenChip,
        ]),
      ]),
      Table.HTMLElement,
    );
    loadTable();

    Nav.removeActive();
    Nav.books.classList.add('active');
  };

  const removeAllActive = () => {
    [Table.titel, Table.spice, Table.bewertung, Table.genre].forEach((el) => {
      el.classList.remove('active');
    });
  };

  // Set up listeners
  allBooksChip.addEventListener('change', () => loadTable('def'));
  gelesenChip.addEventListener('change', () => loadTable('gel'));
  ungelesenChip.addEventListener('change', () => loadTable('ung'));
  favoritChip.addEventListener('change', () => loadTable('fav'));
  leseexemplarChip.addEventListener('change', () => loadTable('exp'));
  verliehenChip.addEventListener('change', () => loadTable('ver'));

  const callback = (e, order) => {
    removeAllActive();
    e.target.classList.add('active');
    loadTable(null, order);
  };

  Table.titel.addEventListener('click', (e) => callback(e, 'tit'));
  Table.genre.addEventListener('click', (e) => callback(e, 'gen'));
  Table.spice.addEventListener('click', (e) => callback(e, 'spi-d'));
  Table.bewertung.addEventListener('click', (e) => callback(e, 'bew-d'));
  Table.filter.addEventListener('click', (e) => callback(e, 'def'));

  Nav.books.addEventListener('click', () => Helper.updateMain(Books));
  Helper.addDataChangeFn(loadTable);

  return { load };
})();

export default Books;
