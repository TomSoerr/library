import './modal.css';
import Helper, { _ } from '../../helper';
import iconButton from '../icon-button/iconButton';

/**
 * Modal that can be updated with content
 * @returns {Object} The modal Object
 */
const Modal = (() => {
  // Create important element
  const contentArea = _('div.modal-content-area');

  const close = iconButton({
    aria: 'Schließen',
    icon: '\\e5cd',
  });

  // Link button to the Helper functions
  close.addEventListener('click', Helper.closeModal);

  // Wrap the content
  const HTMLElement = _('dialog#modal', [
    _('form[method="dialog"]', [close, contentArea]),
    contentArea,
  ]);

  // Link the elements to the Helper functions
  Helper.modal = contentArea;
  Helper.dialog = HTMLElement;

  return { HTMLElement, contentArea };
})();

export default Modal;
