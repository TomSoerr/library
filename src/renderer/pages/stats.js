import '../styles/stats.css';
import Nav from '../modules/nav/nav';
import Helper, { _ } from '../helper';

const Stats = (() => {
  const loadData = async () => {
    // Function to check if the book was finished in a given year
    const date = new Date().getFullYear();
    const checkDate = (beendetAm, shift) => {
      if (beendetAm) {
        const beendetYear = beendetAm.split('-')[0];
        return beendetYear === (date - shift).toString();
      }
    };

    // Load data from the database
    const data = await Helper.loadDatabase();

    // Calculate statistics
    const booksNumber = data.length;
    const ungelesen = data.filter((book) => book.gelesen === false).length;
    const gelesen = data.filter((book) => book.gelesen === true).length;
    const verliehen = data.filter((book) => book.verliehen === true).length;
    const leseexemplar = data.filter(
      (book) => book.leseexemplar === true,
    ).length;
    const favoriten = data.filter((book) => book.favorit === true).length;
    const fuenfSterne = data.filter((book) => book.bewertung === 5).length;
    const fuenfSpice = data.filter((book) => book.spice === 5).length;
    const gelesenDiesesJahr = data.filter((book) =>
      checkDate(book.beendet_am, 0),
    ).length;
    const gelesenLetztesJahr = data.filter((book) =>
      checkDate(book.beendet_am, 1),
    ).length;
    const gelesenVorLetztemJahr = data.filter((book) =>
      checkDate(book.beendet_am, 2),
    ).length;

    return {
      booksNumber,
      ungelesen,
      gelesen,
      verliehen,
      leseexemplar,
      favoriten,
      fuenfSterne,
      fuenfSpice,
      gelesenDiesesJahr,
      gelesenLetztesJahr,
      gelesenVorLetztemJahr,
    };
  };

  const table = (data) =>
    _(
      'div.stats',
      _('table.stats', [
        _('tr', [
          _('td', 'Anzahl der Bücher:'),
          _('td', data.booksNumber || '0'),
        ]),
        _('tr', [
          _('td', 'Anzahl der ungelesenen Bücher:'),
          _('td', data.ungelesen || '0'),
        ]),
        _('tr', [
          _('td', 'Anzahl der gelesenen Bücher:'),
          _('td', data.gelesen || '0'),
        ]),
        _('tr', [
          _('td', 'Prozentsatz der ungelesen Bücher:'),
          _('td', `${((data.ungelesen / data.booksNumber) * 100).toFixed(1)}%`),
        ]),
        _('tr', [
          _('td', 'Anzahl der verliehenen Bücher:'),
          _('td', data.verliehen || '0'),
        ]),
        _('tr', [
          _('td', 'Anzahl der Leseexemplare:'),
          _('td', data.leseexemplar || '0'),
        ]),
        _('tr', [
          _('td', 'Anzahl der Favoriten:'),
          _('td', data.favoriten || '0'),
        ]),
        _('tr', [
          _('td', 'Anzahl der 5-Sterne-Bewertungen:'),
          _('td', data.fuenfSterne || '0'),
        ]),
        _('tr', [
          _('td', 'Anzahl der 5-Spice-Bewertungen:'),
          _('td', data.fuenfSpice || '0'),
        ]),
        _('tr', [
          _('td', 'Gelesene Bücher dieses Jahr:'),
          _('td', data.gelesenDiesesJahr || '0'),
        ]),
        _('tr', [
          _('td', 'Gelesene Bücher letztes Jahr:'),
          _('td', data.gelesenLetztesJahr || '0'),
        ]),
        _('tr', [
          _('td', 'Gelesene Bücher vorletztes Jahr:'),
          _('td', data.gelesenVorLetztemJahr || '0'),
        ]),
      ]),
    );

  const load = async () => {
    Helper.main.append(_('h1', 'Statistiken'), table(await loadData()));
    Nav.removeActive();
    Nav.stats.classList.add('active');
  };

  Nav.stats.addEventListener('click', () => Helper.updateMain(Stats));
  return { load };
})();

export default Stats;
