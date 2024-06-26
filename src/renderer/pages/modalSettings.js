import Helper, { _ } from '../helper';
import Nav from '../modules/nav/nav';
import button from '../modules/button/button';

/**
 * Books page object
 * This module contains the logic for the filtering and sorting of the table
 */
const ModalSettings = (() => {
  // Create buttons for working with the database
  const importButton = button({
    text: 'Importieren',
    type: 'tonal',
  });

  const exportButton = button({
    text: 'Exportieren',
    type: 'filled',
  });

  const deleteButton = button({
    text: 'Löschen',
    type: 'tonal',
  });

  // Link the buttons to the electron functions
  importButton.addEventListener('click', () => {
    window.electron.importDatabase().then(Helper.callDataChangeFn);
  });

  exportButton.addEventListener('click', window.electron.exportDatabase);

  deleteButton.addEventListener('click', () => {
    window.electron.deleteDatabase().then(Helper.callDataChangeFn);
  });

  // Create the modal content
  const HTMLElement = _('div.modal-content', [
    _('h2', 'Einstellungen'),
    _('h3', 'Datenbank'),
    _('p', 'Diese Einstellungen sind mit großer Vorsicht zu behandeln!'),
    // Remove import and delete button for production
    _('div.button-row', [exportButton, importButton]),
    _('h3', 'Sortierung'),
    _(
      'p',
      'Die normale Reihenfolge der Bücher ist nach Nachnamen des Autors. Gibt es zwei Nachnamen, wird der letzte genommen. Besteht der Nachname aus zwei Teilen, sollten die Teile mit einem Bindestrich zusammengefügt werden. Beispiel: "Le Guin" wird zu "Le-Guin".',
    ),
  ]);

  Nav.settings.addEventListener('click', () => Helper.updateModal(HTMLElement));
})();

export default ModalSettings;
