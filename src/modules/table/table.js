import './table.css';
import { _ } from '../../helper';
import iconButton from '../icon-button/iconButton';

/**
 *
 * @param {Object[]} tableData - The data for the table in JSON format
 * @returns
 */
const table = (tableData) => {
  const rowTemplate = (data) =>
    _(`tr[data-id="${data.id}"]`, [
      _(`td.ms[data-gelesen="${data.gelesen}"]`),
      _('td', [
        _(`div.titel${data.favorit ? '.fav' : ''}`, [data.titel, _('span.ms')]),
        _('div.autor', data.autor),
      ]),
      _('td.ms.genre', data.genre),
      _('td.spice', [
        ...Array.from({ length: data.spice }, () => _('span.ms.filled')),
        ...Array.from({ length: 5 - data.spice }, () => _('span.ms')),
      ]),
      _(`td.bewertung[data-bewertung="${data.bewertung}"]`, [
        ...Array.from({ length: data.bewertung }, () => _('span.ms.filled')),
        ...Array.from({ length: 5 - data.bewertung }, () => _('span.ms')),
      ]),
      _(
        'td.edit',
        iconButton({ aria: 'Ansehen und bearbeiten', icon: '\\e5d4' }),
      ),
    ]);

  const HTMLElement = _(
    'div#books-wrapper',
    _('table#books', [
      _('tr', [
        _('th'),
        _('th', 'Titel'),
        _('th', 'Genre'),
        _('th', 'Spice'),
        _('th', 'Bewertung'),
        _('th', 'Edit'),
      ]),
      ...tableData.reduce((acc, cur) => {
        acc.push(rowTemplate(cur));
        return acc;
      }, []),
    ]),
  );

  return HTMLElement;
};

export default table;
