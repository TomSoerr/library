import '../styles/stats.css';
import Nav from '../modules/nav/nav';
import Helper, { _ } from '../helper';

/**
 * Stats page object.
 * This module creates statistics about the books in the database
 */
const Stats = (() => {
  /**
   * Load data from the database and calculate statistics
   * @returns {Object} - Object with the statistics
   */
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
    const data = await Helper.loadDatabase('def', 'def');

    // Calculate statistics
    const booksNumber = (await Helper.loadDatabase('def')).length;
    const ungelesen = (await Helper.loadDatabase('ung')).length;
    const gelesen = (await Helper.loadDatabase('gel')).length;
    const verliehen = (await Helper.loadDatabase('ver')).length;
    const geliehen = (await Helper.loadDatabase('gli')).length;
    const aussortiert = (await Helper.loadDatabase('aus')).length;
    const ebook = (await Helper.loadDatabase('ebo')).length;
    const leseexemplar = (await Helper.loadDatabase('exp')).length;
    const favoriten = (await Helper.loadDatabase('fav')).length;
    const fuenfSterne = (await Helper.loadDatabase('gel')).filter(
      (book) => book.bewertung === 5,
    ).length;
    const fuenfSpice = (await Helper.loadDatabase('gel')).filter(
      (book) => book.spice === 5,
    ).length;
    const gelesenDiesesJahr = (await Helper.loadDatabase('gel')).filter(
      (book) => checkDate(book.beendet_am, 0),
    ).length;
    const gelesenLetztesJahr = (await Helper.loadDatabase('gel')).filter(
      (book) => checkDate(book.beendet_am, 1),
    ).length;
    const gelesenVorLetztemJahr = (await Helper.loadDatabase('gel')).filter(
      (book) => checkDate(book.beendet_am, 2),
    ).length;
    
    const genreRanking = (await Helper.loadDatabase('gel')).reduce(
      (acc, book) => {
        if (Object.prototype.hasOwnProperty.call(acc, book.genre)) {
          acc[book.genre] += 1;
        } else {
          acc[book.genre] = 1;
        }
        return acc;
      },
      {},
    );

    const topGenre = Object.entries(genreRanking)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .reduce((acc, genre) => {
        acc.push(genre[0]);
        return acc;
      }, []);

    return {
      booksNumber,
      ungelesen,
      gelesen,
      verliehen,
      geliehen,
      aussortiert,
      ebook,
      leseexemplar,
      favoriten,
      fuenfSterne,
      fuenfSpice,
      gelesenDiesesJahr,
      gelesenLetztesJahr,
      gelesenVorLetztemJahr,
      genre1: topGenre[0],
      genre2: topGenre[1],
      genre3: topGenre[2],
    };
  };

  /**
   * Visualize the statistics in a table
   * @param {Object} data - Data object with the statistics
   */
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
          _(
            'td',
            `${((data.ungelesen / data.booksNumber) * 100 || 0).toFixed(1)}%`,
          ),
        ]),
        _('tr', [
          _('td', 'Anzahl der verliehenen Bücher:'),
          _('td', data.verliehen || '0'),
        ]),
        _('tr', [
          _('td', 'Anzahl der geliehenen Bücher:'),
          _('td', data.geliehen || '0'),
        ]),
        _('tr', [
          _('td', 'Anzahl der aussortierten Bücher:'),
          _('td', data.aussortiert || '0'),
        ]),
        _('tr', [_('td', 'Anzahl der E-Books:'), _('td', data.ebook || '0')]),
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
        _('tr', [
          _('td', 'Häufigste Genre:'),
          _('td', data.genre1 || 'Keine Daten'),
        ]),
        _('tr', [
          _('td', 'Zweit häufigste Genre:'),
          _('td', data.genre2 || 'Keine Daten'),
        ]),
        _('tr', [
          _('td', 'Dritt häufigste Genre:'),
          _('td', data.genre3 || 'Keine Daten'),
        ]),
      ]),
    );

  // Function that will be called when the page is loaded
  const load = async () => {
    Helper.main.append(table(await loadData()));
    Nav.removeActive();
    Nav.stats.classList.add('active');
  };

  // Link the nav button to the Helper functions
  Nav.stats.addEventListener('click', () => Helper.updateMain(Stats));

  return { load };
})();

export default Stats;
