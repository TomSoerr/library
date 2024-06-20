import Helper, { _ } from '../helper';
import Nav from '../modules/nav/nav';
import button from '../modules/button/button';

const ModalSettings = (() => {
  const importButton = button({
    text: 'Importieren',
    type: 'tonal',
  });

  importButton.addEventListener('click', () => {
    window.electron.importDatabase().then(Helper.callDataChangeFn);
  });

  const exportButton = button({
    text: 'Exportieren',
    type: 'filled',
  });

  exportButton.addEventListener('click', window.electron.exportDatabase);

  const deleteButton = button({
    text: 'Löschen',
    type: 'tonal',
  });

  deleteButton.addEventListener('click', () => {
    window.electron.deleteDatabase().then(Helper.callDataChangeFn);
  });

  const HTMLElement = _('div.modal-content', [
    _('h2', 'Einstellungen'),
    _('h3', 'Datenbank'),
    _('p', 'Diese Einstellungen sind mit großer Vorsicht zu behandeln!'),
    // Remove import and delete button for production
    _('div.button-row', [exportButton, importButton, deleteButton]),
    _('h3', 'Sortierung'),
    _(
      'p',
      'Die normale Reihenfolge der Bücher ist nach Nachnamen des Autors. Gibt es zwei Nachnamen, wird der letzte genommen. Besteht der Nachname aus zwei Teilen, sollten die Teile mit einem Bindestrich zusammengefügt werden. Beispiel: "Le Guin" wird zu "Le-Guin".',
    ),
  ]);

  Nav.settings.addEventListener('click', () => Helper.updateModal(HTMLElement));
})();

export default ModalSettings;
