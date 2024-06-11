import { books } from '../modules/nav/nav';
import Helper from '../helper';

const Books = (() => {
  const remove = () => {
    console.log('Book page removed');
  };

  const load = () => {
    Helper.main.append('books');
  };

  books.addEventListener('click', () => Helper.updateMain(Books));
  return { load, remove };
})();

export default Books;
