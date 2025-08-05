import './table.css';
import Helper, { _ } from '../../helper';
import iconButton from '../icon-button/iconButton';
import button from '../button/button';
import form from '../form/form';
import LibraryService from '../../../../database';

/**
 * Table that can be updated with content
 * This module is only for visualizing the data
 * @param {Object[]} data - The data for the table in JSON format
 * @returns
 */
const Table = (() => {
  const editButton = () => {
    // Buttons that will be used inside the modal
    const saveButton = button({
      text: 'Speichern',
      type: 'filled',
      icon: '\\e161',
      submit: true,
    });

    const deleteButton = button({
      text: 'Löschen',
      type: 'tonal',
      icon: '\\e92b',
    });

    // Link the buttons to the Helper functions
    saveButton.addEventListener('click', (e) => {
      Helper.saveOrCreate(e);
    });

    deleteButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const { id } = e.target.closest('form').dataset;
      if (id && typeof Number(id) === 'number') {
        const response = await LibraryService.deleteBook(id);
        if (response) {
          Helper.callDataChangeFn();
          Helper.closeModal();
        }
      }
    });

    // Button to open the modal
    const penButton = iconButton({
      aria: 'Ansehen und bearbeiten',
      icon: '\\e3c9',
    });

    // Create modal for each row
    penButton.addEventListener('click', async (e) => {
      const { id } = e.target.closest('tr').dataset;
      if (id && typeof Number(id) === 'number') {
        const rowData = await LibraryService.getBook(+id);
        console.info('Row data for edit:', rowData);
        console.info('id:', typeof id, id);
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

    return penButton;
  };

  /**
   * @param {Object} row - The row data form the database
   * @param {Boolean} empty - Can hide the edit button if data is empty
   * @returns {HTMLElement} - One table row
   */
  const rowTemplate = (row, empty = false) =>
    _(`tr[data-id="${row.id}"]`, [
      _(`td.ms[data-gelesen="${row.gelesen == 1 ? 'true' : 'false'}"]`),
      _('td', [
        _(`div.titel${row.favorit ? '.fav' : ''}`, [
          row.titel,
          _('span.ms-within'),
        ]),
        _('div.autor', row.autor),
      ]),
      _('td.ms.genre', row.genre),
      _('td.spice', [
        ...Array.from({ length: row.spice }, () => _('span.ms-within.filled')),
        ...Array.from({ length: 5 - row.spice }, () => _('span.ms-within')),
      ]),
      _(`td.bewertung[data-bewertung="${row.bewertung}"]`, [
        ...Array.from({ length: row.bewertung }, () =>
          _('span.ms-within.filled'),
        ),
        ...Array.from({ length: 5 - row.bewertung }, () => _('span.ms-within')),
      ]),
      _('td.edit', empty ? '' : editButton()),
    ]);

  // Table body as a wrapper for the updatable content
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

  // Table headers that can be used as buttons
  // This functionality is added by another module
  const titel = _(
    'span.ms-within[title="Nach Titel sortieren"::tabindex="0"::role="button"]',
    'Titel',
  );
  const genre = _(
    'span.ms-within[title="Nach Genre sortieren"::tabindex="0"::role="button"]',
    'Genre',
  );
  const spice = _(
    'span.ms-within[title="Nach Spice sortieren"::tabindex="0"::role="button"]',
    'Spice',
  );
  const bewertung = _(
    'span.ms-within[title="Nach Bewertung sortieren"::tabindex="0"::role="button"]',
    'Bewertung',
  );
  const filter = iconButton({
    aria: 'Sortierung aufheben',
    icon: '\\eb57',
  });

  // Wrap the table headers so they can only the text can be clicked
  const tableHeader = [titel, genre, spice, bewertung, filter].map((el) =>
    _('th', el),
  );

  // Create the table with no content
  const HTMLElement = _(
    'div#books-wrapper',
    _('table#books', [
      _('thead', _('tr', [_('th'), ...tableHeader])),
      tableBody,
    ]),
  );

  // Export the headers so they could be used for sorting
  return { HTMLElement, loadTable, titel, genre, spice, bewertung, filter };
})();

export default Table;
