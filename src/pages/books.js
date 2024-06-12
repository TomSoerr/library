import Nav from '../modules/nav/nav';
import Helper from '../helper';

const Books = (() => {
  const load = () => {
    Helper.main.append('books');
    Nav.removeActive();
    Nav.books.classList.add('active');
  };

  Nav.books.addEventListener('click', () => Helper.updateMain(Books));
  return { load };
})();

export default Books;
