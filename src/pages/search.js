import Nav from '../modules/nav/nav';
import Helper from '../helper';

const Search = (() => {
  const load = () => {
    Helper.main.append('search');
    Nav.removeActive();
    Nav.search.classList.add('active');
  };

  Nav.search.addEventListener('click', () => Helper.updateMain(Search));
  return { load };
})();

export default Search;
