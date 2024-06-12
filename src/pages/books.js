import Helper, { _ } from '../helper';
import Nav from '../modules/nav/nav';
import table from '../modules/table/table';

const Books = (() => {
  const load = () => {
    Helper.main.append(
      'Gelesen --- Ungelesen --- Leseexemplar --- Favorite --- Verliehen',
      table(Helper.loadDatabase()),
    );
    Nav.removeActive();
    Nav.books.classList.add('active');
  };

  Nav.books.addEventListener('click', () => Helper.updateMain(Books));
  return { load };
})();

export default Books;
