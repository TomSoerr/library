import './modal.css';
import Helper, { _ } from '../../helper';

const Modal = (() => {
  // Create important element
  const contentArea = _('div.modal-content-area');

  const close = _('button.modal-close', 'x');

  close.addEventListener('click', Helper.closeModal);

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
