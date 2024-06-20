import './table.css';
import Helper, { _ } from '../../helper';
import iconButton from '../icon-button/iconButton';
import button from '../button/button';
import form from '../form/form';

/**
 *
 * @param {Object[]} data - The data for the table in JSON format
 * @returns
 */
const Table = (() => {
  const editButton = () => {
    const btn = iconButton({
      aria: 'Ansehen und bearbeiten',
      icon: '\\e5d4',
    });

    const saveButton = button({
      text: 'Speichern',
      type: 'filled',
      icon: '\\e161',
    });

    saveButton.addEventListener('click', (e) => {
      Helper.saveOrCreate(e);
    });

    const deleteButton = button({
      text: 'Löschen',
      type: 'tonal',
      icon: '\\e92b',
    });

    deleteButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const { id } = e.target.closest('form').dataset;
      if (id && typeof Number(id) === 'number') {
        await window.electron.deleteData(id);
        Helper.callDataChangeFn();
        Helper.closeModal();
      }
    });

    btn.addEventListener('click', async (e) => {
      const { id } = e.target.closest('tr').dataset;
      if (id && typeof Number(id) === 'number') {
        const rowData = await window.electron.fetchData(id);
        if (rowData) {
          Helper.updateModal(
            _('div.modal-content', [
              _('h2', 'Buch bearbeiten'),
              form({
                data: rowData,
                button: [deleteButton, saveButton],
              }),
            ]),
          );
        }
      }
    });

    return btn;
  };

  const rowTemplate = (row, empty = false) =>
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
      _('td.edit', empty ? '' : editButton()),
    ]);

  const tableBody = _('tbody');

  const loadTable = (data) => {
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
    if (data.length === 0) {
      tableBody.appendChild(
        rowTemplate(
          {
            id: 0,
            autor: 'Keine Daten vorhanden',
            titel: 'Keine Daten vorhanden',
            genre: 'Keine Daten vorhanden',
            spice: 0,
            bewertung: 0,
            gelesen: false,
            favorit: false,
          },
          true,
        ),
      );
    }
    data.forEach((row) => {
      tableBody.appendChild(rowTemplate(row));
    });
  };

  const titel = _(
    'th.ms-within[title="Nach Titel sortieren"::tabindex="0"::role="button"]',
    'Titel',
  );
  const genre = _(
    'th.ms-within[title="Nach Genre sortieren"::tabindex="0"::role="button"]',
    'Genre',
  );
  const spice = _(
    'th.ms-within[title="Nach Spice sortieren"::tabindex="0"::role="button"]',
    'Spice',
  );
  const bewertung = _(
    'th.ms-within[title="Nach Bewertung sortieren"::tabindex="0"::role="button"]',
    'Bewertung',
  );
  const filter = _(
    'th.ms-within',
    iconButton({
      aria: 'Sortierung aufheben',
      icon: '\\eb32',
    }),
  );

  const HTMLElement = _(
    'div#books-wrapper',
    _('table#books', [
      _('thead', _('tr', [_('th'), titel, genre, spice, bewertung, filter])),
      tableBody,
    ]),
  );

  return { HTMLElement, loadTable, titel, genre, spice, bewertung, filter };
})();

export default Table;
