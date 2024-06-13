import './table.css';
import { _ } from '../../helper';
import iconButton from '../icon-button/iconButton';

/**
 *
 * @param {Object[]} data - The data for the table in JSON format
 * @returns
 */
const Table = (() => {
  const rowTemplate = (row) =>
    _(`tr[data-id="${row.id}"]`, [
      _(`td.ms[data-gelesen="${row.gelesen}"]`),
      _('td', [
        _(`div.titel${row.favorit ? '.fav' : ''}`, [row.titel, _('span.ms')]),
        _('div.autor', row.autor),
      ]),
      _('td.ms.genre', row.genre),
      _('td.spice', [
        ...Array.from({ length: row.spice }, () => _('span.ms.filled')),
        ...Array.from({ length: 5 - row.spice }, () => _('span.ms')),
      ]),
      _(`td.bewertung[data-bewertung="${row.bewertung}"]`, [
        ...Array.from({ length: row.bewertung }, () => _('span.ms.filled')),
        ...Array.from({ length: 5 - row.bewertung }, () => _('span.ms')),
      ]),
      _(
        'td.edit',
        !row.empty
          ? iconButton({ aria: 'Ansehen und bearbeiten', icon: '\\e5d4' })
          : '',
      ),
    ]);

  const tableBody = _('tbody');

  const loadTable = (data) => {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    if (data.length === 0) {
      tableBody.appendChild(
        rowTemplate({
          id: 0,
          autor: 'Keine Daten vorhanden',
          titel: 'Keine Daten vorhanden',
          genre: 'Keine Daten vorhanden',
          spice: 0,
          bewertung: 0,
          gelesen: false,
          favorit: false,
          empty: true,
        }),
      );
    }
    data.forEach((row) => {
      tableBody.appendChild(rowTemplate(row));
    });
  };

  const HTMLElement = _(
    'div#books-wrapper',
    _('table#books', [
      _(
        'thead',
        _('tr', [
          _('th'),
          _('th', 'Titel'),
          _('th', 'Genre'),
          _('th', 'Spice'),
          _('th', 'Bewertung'),
          _('th'),
        ]),
      ),
      tableBody,
    ]),
  );

  return { HTMLElement, loadTable };
})();

export default Table;
