import '../styles/stats.css';
import Nav from '../modules/nav/nav';
import Helper, { _ } from '../helper';

const Stats = (() => {
  const load = async () => {
    const date = new Date().getFullYear();
    const data = await Helper.loadDatabase();

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

    const checkDate = (beendetAm, shift) => {
      if (beendetAm) {
        const beendetYear = beendetAm.split('-')[0];
        return beendetYear === (date - shift).toString();
      }
    };

    const gelesenDiesesJahr = data.filter((book) =>
      checkDate(book.beendet_am, 0),
    ).length;
    const gelesenLetztesJahr = data.filter((book) =>
      checkDate(book.beendet_am, 1),
    ).length;
    const gelesenVorLetztemJahr = data.filter((book) =>
      checkDate(book.beendet_am, 2),
    ).length;

    Helper.main.append(
      _('h1', 'Statistiken'),
      _(
        'div.stats',
        _('table.stats', [
          _('tr', [_('td', 'Anzahl der Bücher:'), _('td', booksNumber || '0')]),
          _('tr', [
            _('td', 'Anzahl der ungelesenen Bücher:'),
            _('td', ungelesen || '0'),
          ]),
          _('tr', [
            _('td', 'Anzahl der gelesenen Bücher:'),
            _('td', gelesen || '0'),
          ]),
          _('tr', [
            _('td', 'Prozentsatz der ungelesen Bücher:'),
            _('td', `${((ungelesen / booksNumber) * 100).toFixed(1)}%`),
          ]),
          _('tr', [
            _('td', 'Anzahl der verliehenen Bücher:'),
            _('td', verliehen || '0'),
          ]),
          _('tr', [
            _('td', 'Anzahl der Leseexemplare:'),
            _('td', leseexemplar || '0'),
          ]),
          _('tr', [
            _('td', 'Anzahl der Favoriten:'),
            _('td', favoriten || '0'),
          ]),
          _('tr', [
            _('td', 'Anzahl der 5-Sterne-Bewertungen:'),
            _('td', fuenfSterne || '0'),
          ]),
          _('tr', [
            _('td', 'Anzahl der 5-Spice-Bewertungen:'),
            _('td', fuenfSpice || '0'),
          ]),
          _('tr', [
            _('td', 'Gelesene Bücher dieses Jahr:'),
            _('td', gelesenDiesesJahr || '0'),
          ]),
          _('tr', [
            _('td', 'Gelesene Bücher letztes Jahr:'),
            _('td', gelesenLetztesJahr || '0'),
          ]),
          _('tr', [
            _('td', 'Gelesene Bücher vorletztes Jahr:'),
            _('td', gelesenVorLetztemJahr || '0'),
          ]),
        ]),
      ),
    );
    Nav.removeActive();
    Nav.stats.classList.add('active');
  };

  Nav.stats.addEventListener('click', () => Helper.updateMain(Stats));
  return { load };
})();

export default Stats;
