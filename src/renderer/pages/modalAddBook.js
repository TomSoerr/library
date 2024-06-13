import Helper, { _ } from '../helper';
import Nav from '../modules/nav/nav';
import button from '../modules/button/button';
import form from '../modules/form/form';

const ModalAddBook = (() => {
  const add = button({
    text: 'Hinzufügen',
    type: 'filled',
    icon: '\\e145',
  });

  const emptyForm = form({ data: null, button: add });

  const HTMLElement = _('div.modal-content', [
    _('h2', 'Buch hinzufügen'),
    emptyForm,
    add,
  ]);

  Nav.addBook.addEventListener('click', () => Helper.updateModal(HTMLElement));
})();

export default ModalAddBook;
