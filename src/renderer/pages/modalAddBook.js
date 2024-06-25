import Helper, { _ } from '../helper';
import Nav from '../modules/nav/nav';
import button from '../modules/button/button';
import form from '../modules/form/form';

/**
 * Add book page (modal) object.
 * This module creates a modal for adding a book
 */
const ModalAddBook = (() => {
  // Button to add a book
  const add = button({
    text: 'Hinzufügen',
    type: 'filled',
    icon: '\\e145',
    submit: true,
  });

  // Link the button to the Helper functions
  add.addEventListener('click', Helper.saveOrCreate);

  // Create an empty form
  const emptyForm = form({ data: null, button: add });

  // Create the modal content
  const HTMLElement = _('div.modal-content', [
    _('h2', 'Buch hinzufügen'),
    emptyForm,
  ]);

  // Link the nav button to the Helper functions
  Nav.addBook.addEventListener('click', () => Helper.updateModal(HTMLElement));
})();

export default ModalAddBook;
