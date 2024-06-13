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
    type: 'tonal',
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
    _('div', [importButton, exportButton, deleteButton]),
  ]);

  Nav.settings.addEventListener('click', () => Helper.updateModal(HTMLElement));
})();

export default ModalSettings;
