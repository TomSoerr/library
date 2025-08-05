import './table.css';
import Helper, { _ } from '../../helper';
import iconButton from '../icon-button/iconButton';
import button from '../button/button';
import form from '../form/form';
import LibraryService from '../../../../database';
import dropdown from '../dropdown/dropdown';

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
      const { id } = e.target.closest('li').dataset;
      if (id && typeof Number(id) === 'number') {
        const rowData = await LibraryService.getBook(+id);
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
    _(`li[data-id="${row.id}"]`, [
      _(`div.ms[data-gelesen="${row.gelesen == 1 ? 'true' : 'false'}"]`),

      _('div', [
        _(`div.titel${row.favorit ? '.fav' : ''}`, [
          row.titel,
          _('span.ms-within'),
        ]),
        _('div.autor', row.autor),
      ]),

      _('div.genre', row.genre),
      _('div.spice', [
        ...Array.from({ length: row.spice }, () => _('span.ms-within.filled')),
        ...Array.from({ length: 5 - row.spice }, () => _('span.ms-within')),
      ]),
      _(`div.bewertung[data-bewertung="${row.bewertung}"]`, [
        ...Array.from({ length: row.bewertung }, () =>
          _('span.ms-within.filled'),
        ),
        ...Array.from({ length: 5 - row.bewertung }, () => _('span.ms-within')),
      ]),

      _('div.edit', empty ? '' : editButton()),
      _('hr'),
    ]);

  // Table body as a wrapper for the updatable content
  const tableList = _('ul');

  const loadTable = (data) => {
    while (tableList.firstChild) {
      tableList.removeChild(tableList.firstChild);
    }
    if (data.length === 0) {
      tableList.appendChild(
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
      tableList.appendChild(rowTemplate(row));
    });
  };

  const selectOrder = dropdown({
    label: 'Sortierung',
    name: 'table-sort',
    options: [
      { value: 'def', label: 'Autor' },
      { value: 'tit', label: 'Titel' },
      { value: 'gen', label: 'Genre' },
      { value: 'spi-desc', label: 'Spice - absteigend' },
      { value: 'spi-asc', label: 'Spice - aufsteigend' },
      { value: 'bew-desc', label: 'Bewertung - absteigend' },
      { value: 'bew-asc', label: 'Bewertung - aufsteigend' },
    ],
  });

  // Create the table with no content
  const HTMLElement = _('div#books-wrapper', [
    selectOrder,
    _('div#books', tableList),
  ]);

  // Export the headers so they could be used for sorting
  return { HTMLElement, loadTable, selectOrder };
})();

export default Table;
