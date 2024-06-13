import Helper, { _ } from '../helper';
import Nav from '../modules/nav/nav';
import Table from '../modules/table/table';

const Books = (() => {
  let currentOrder = null;

  const loadTable = async (order = null) => {
    if (order !== null) {
      currentOrder = order;
    }
    const data = await Helper.loadDatabase();
    Table.loadTable(data);
  };

  const load = () => {
    // Add table to the main element and load with default data
    Helper.main.append(
      'Gelesen --- Ungelesen --- Leseexemplar --- Favorite --- Verliehen',
      Table.HTMLElement,
    );
    loadTable();

    Nav.removeActive();
    Nav.books.classList.add('active');
  };

  // Set up listeners
  Nav.books.addEventListener('click', () => Helper.updateMain(Books));
  Helper.addDataChangeFn(loadTable);

  return { load };
})();

export default Books;
