import Nav from '../modules/nav/nav';
import Helper from '../helper';

const Stats = (() => {
  const load = () => {
    Helper.main.append('stats');
    Nav.removeActive();
    Nav.stats.classList.add('active');
  };

  Nav.stats.addEventListener('click', () => Helper.updateMain(Stats));
  return { load };
})();

export default Stats;
